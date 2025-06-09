"use client"

import { useState } from "react"
import { PlusIcon, Loader2 } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createApplication } from "@/lib/actions/application-actions"
import { applicationSchema } from "@/lib/validations/application"

// 旅游团数据
const tours = [
  {
    id: "sanya",
    name: "三亚6日游",
    adultPrice: 3000,
    childPrice: 1500,
    departDates: [
      new Date(2025, 5, 15),
      new Date(2025, 5, 25),
      new Date(2025, 6, 5),
      new Date(2025, 6, 15),
      new Date(2025, 6, 25),
    ],
    maxParticipants: 20,
  },
  {
    id: "beijing",
    name: "北京5日游",
    adultPrice: 2500,
    childPrice: 1200,
    departDates: [new Date(2025, 5, 20), new Date(2025, 6, 1), new Date(2025, 6, 10), new Date(2025, 6, 20)],
    maxParticipants: 20,
  },
  {
    id: "xiamen",
    name: "厦门4日游",
    adultPrice: 2000,
    childPrice: 1000,
    departDates: [new Date(2025, 5, 25), new Date(2025, 6, 5), new Date(2025, 6, 15), new Date(2025, 6, 25)],
    maxParticipants: 20,
  },
  {
    id: "yunnan",
    name: "云南8日游",
    adultPrice: 4000,
    childPrice: 2000,
    departDates: [new Date(2025, 6, 1), new Date(2025, 6, 10), new Date(2025, 6, 20), new Date(2025, 7, 1)],
    maxParticipants: 20,
  },
  {
    id: "guilin",
    name: "桂林7日游",
    adultPrice: 3500,
    childPrice: 1800,
    departDates: [new Date(2025, 6, 10), new Date(2025, 6, 20), new Date(2025, 7, 1), new Date(2025, 7, 10)],
    maxParticipants: 20,
  },
]

// 订金计算表（根据距离出发日期的天数）
const depositRates = [
  { days: 60, adultRate: 300, childRate: 150 },
  { days: 30, adultRate: 500, childRate: 300 },
  { days: 15, adultRate: 800, childRate: 500 },
  { days: 7, adultRate: 1000, childRate: 600 },
  { days: 0, adultRate: 1500, childRate: 800 },
]

export function NewApplicationButton() {
  const [open, setOpen] = useState(false)
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      responsiblePerson: "",
      phone: "",
      tourId: "",
      departureDate: undefined,
      adultCount: 1,
      childCount: 0,
    },
  })

  const watchTourId = form.watch("tourId")
  const watchDepartureDate = form.watch("departureDate")
  const watchAdultCount = form.watch("adultCount")
  const watchChildCount = form.watch("childCount")

  // 当选择旅游团时更新选中的旅游团信息
  const onTourChange = (value: string) => {
    const tour = tours.find((t) => t.id === value)
    setSelectedTour(tour)
    // @ts-ignore
    form.setValue("departureDate", undefined)
  }

  // 计算订金和总金额
  const calculateAmounts = () => {
    if (!selectedTour || !watchDepartureDate) return { deposit: 0, total: 0 }

    const daysUntilDeparture = differenceInDays(watchDepartureDate, new Date())

    // 找到适用的订金费率
    let depositRate = depositRates[depositRates.length - 1]
    for (const rate of depositRates) {
      if (daysUntilDeparture >= rate.days) {
        depositRate = rate
        break
      }
    }

    const adultDeposit = depositRate.adultRate * watchAdultCount
    const childDeposit = depositRate.childRate * watchChildCount
    const totalDeposit = adultDeposit + childDeposit

    const totalAmount = selectedTour.adultPrice * watchAdultCount + selectedTour.childPrice * watchChildCount

    return {
      deposit: totalDeposit,
      total: totalAmount,
    }
  }

  const { deposit, total } = calculateAmounts()

  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    try {
      setIsSubmitting(true)

      // 添加计算出的金额到表单数据
      const applicationData = {
        ...data,
        tour: selectedTour?.name || "",
        deposit,
        totalAmount: total,
        status: "pending",
        applicationDate: new Date(),
      }

      // 调用创建申请的Server Action
      // @ts-ignore
      const result = await createApplication(applicationData)

      if (result.success&& result.data) {
        toast({
          title: "申请创建成功",
          description: `申请编号: ${result.data.id}`,
        })
        setOpen(false)
        form.reset()
        router.refresh()
      } else {
        toast({
          title: "申请创建失败",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("创建申请失败:", error)
      toast({
        title: "申请创建失败",
        description: "创建申请时发生错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" />
          新建申请
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>新建旅游申请</DialogTitle>
          <DialogDescription>创建新的旅游申请，填写申请责任人信息和旅游团信息</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="responsiblePerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>申请责任人</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入申请责任人姓名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>联系电话</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入联系电话" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="tourId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>旅游团</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        onTourChange(value)
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择旅游团" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tours.map((tour) => (
                          <SelectItem key={tour.id} value={tour.id}>
                            {tour.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>出发日期</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        // 将字符串日期转换为Date对象
                        const selectedDate = new Date(value)
                        field.onChange(selectedDate)
                      }}
                      value={field.value ? format(field.value, "yyyy-MM-dd") : undefined}
                      disabled={!selectedTour}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择出发日期" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedTour?.departDates.map((date:Date, index:number) => {
                          const formattedDate = format(new Date(date), "yyyy-MM-dd")
                          return (
                            <SelectItem key={index} value={formattedDate}>
                              {formattedDate}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    {selectedTour && <FormDescription>请选择一个可用的出发日期</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="adultCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>成人人数</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    {selectedTour && <FormDescription>成人价格: ¥{selectedTour.adultPrice}/人</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="childCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>儿童人数</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    {selectedTour && <FormDescription>儿童价格: ¥{selectedTour.childPrice}/人</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedTour && watchDepartureDate && (
              <>
                <Separator />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">订金</CardTitle>
                      <CardDescription>
                        距离出发日期 {differenceInDays(watchDepartureDate, new Date())} 天
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">¥{deposit.toLocaleString()}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">总金额</CardTitle>
                      <CardDescription>
                        成人: {watchAdultCount}人, 儿童: {watchChildCount}人
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">¥{total.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                创建申请
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
