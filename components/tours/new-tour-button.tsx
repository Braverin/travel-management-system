"use client"

import { useState } from "react"
import { PlusIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"



const tourSchema = z.object({
  name: z.string().min(2, { message: "旅游团名称至少需要2个字符" }).max(50, { message: "旅游团名称不能超过50个字符" }),
  description: z.string().min(10, { message: "描述至少需要10个字符" }).max(500, { message: "描述不能超过500个字符" }),
  adultPrice: z.number().min(1, { message: "成人价格必须大于0" }).max(50000, { message: "成人价格不能超过50000" }),
  childPrice: z.number().min(1, { message: "儿童价格必须大于0" }).max(50000, { message: "儿童价格不能超过50000" }),
  maxParticipants: z.number().min(1, { message: "最大人数必须大于0" }).max(100, { message: "最大人数不能超过100" }),
})

export function NewTourButton() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof tourSchema>>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      name: "",
      description: "",
      adultPrice: 3000,
      childPrice: 1500,
      maxParticipants: 20,
    },
  })

  const onSubmit = async (data: z.infer<typeof tourSchema>) => {
    try {
      setIsSubmitting(true)

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "旅游团创建成功",
        description: `旅游团 "${data.name}" 已创建为草稿`,
      })

      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: "创建失败",
        description: "创建旅游团时发生错误，请稍后重试",
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
          新建旅游团
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>新建旅游团</DialogTitle>
          <DialogDescription>创建新的旅游团，设置基本信息和价格</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }: { field: import("react-hook-form").ControllerRenderProps<z.infer<typeof tourSchema>, "name"> }) => (
                  <FormItem>
                    <FormLabel>旅游团名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入旅游团名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }: { field: import("react-hook-form").ControllerRenderProps<z.infer<typeof tourSchema>, "description"> }) => (
                  <FormItem>
                    <FormLabel>旅游团描述</FormLabel>
                    <FormControl>
                      <Textarea placeholder="请输入旅游团详细描述" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormDescription>详细描述旅游行程、包含服务等信息</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="adultPrice"
                render={({ field }: { field: import("react-hook-form").ControllerRenderProps<z.infer<typeof tourSchema>, "adultPrice"> })  => (
                  <FormItem>
                    <FormLabel>成人价格</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3000"
                        {...field}
                        onChange={(e: { target: { value: string } }) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>每位成人的价格（元）</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="childPrice"
                render={({ field }: { field: import("react-hook-form").ControllerRenderProps<z.infer<typeof tourSchema>, "childPrice"> }) => (
                  <FormItem>
                    <FormLabel>儿童价格</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1500"
                        {...field}
                        onChange={(e: { target: { value: string } }) => field.onChange(Number.parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>每位儿童的价格（元）</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }: { field: import("react-hook-form").ControllerRenderProps<z.infer<typeof tourSchema>, "maxParticipants"> }) => (
                <FormItem>
                  <FormLabel>最大参与人数</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="20"
                      {...field}
                      onChange={(e: { target: { value: string } }) => field.onChange(Number.parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>该旅游团最多可容纳的人数</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">价格预览</CardTitle>
                <CardDescription>根据设置的价格计算的费用信息</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">成人价格</p>
                  <p className="text-lg font-bold">¥{form.watch("adultPrice")?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">儿童价格</p>
                  <p className="text-lg font-bold">¥{form.watch("childPrice")?.toLocaleString() || 0}</p>
                </div>
              </CardContent>
            </Card>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                创建旅游团
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
