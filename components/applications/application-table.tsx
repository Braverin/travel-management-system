"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, FileText, CreditCard, AlertTriangle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ApplicationDetails } from "@/components/applications/application-details"
import { useToast } from "@/hooks/use-toast"

// 模拟数据
const generateApplications = (count: number, status?: string) => {
  const statuses = ["pending", "deposit", "completed", "cancelled"]
  const tours = [
    "三亚6日游",
    "北京5日游",
    "厦门4日游",
    "云南8日游",
    "桂林7日游",
    "上海3日游",
    "西藏10日游",
    "青岛5日游",
  ]

  const names = [
    "张三",
    "李四",
    "王五",
    "赵六",
    "钱七",
    "孙八",
    "周九",
    "吴十",
    "郑十一",
    "王十二",
    "刘十三",
    "陈十四",
    "杨十五",
    "黄十六",
    "赵十七",
    "周十八",
  ]

  return Array.from({ length: count }).map((_, i) => {
    const applicationStatus = status || statuses[Math.floor(Math.random() * statuses.length)]
    const departureDate = new Date()
    departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 60) + 1)

    const applicationDate = new Date()
    applicationDate.setDate(applicationDate.getDate() - Math.floor(Math.random() * 30))

    const adultCount = Math.floor(Math.random() * 5) + 1
    const childCount = Math.floor(Math.random() * 3)
    const totalCount = adultCount + childCount

    const deposit = Math.round((adultCount * 500 + childCount * 300) / 100) * 100
    const totalAmount = Math.round((adultCount * 3000 + childCount * 1500) / 100) * 100

    return {
      id: `APP${String(i + 1001).padStart(6, "0")}`,
      responsiblePerson: names[Math.floor(Math.random() * names.length)],
      phone: `1${Math.floor(Math.random() * 9) + 1}${Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("")}`,
      tour: tours[Math.floor(Math.random() * tours.length)],
      departureDate,
      applicationDate,
      adultCount,
      childCount,
      totalCount,
      deposit,
      totalAmount,
      status: applicationStatus,
    }
  })
}

interface ApplicationTableProps {
  status?: string
}

export function ApplicationTable({ status }: ApplicationTableProps) {
  const [applications, setApplications] = useState(generateApplications(20, status))
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [viewApplication, setViewApplication] = useState<any | null>(null)
  const { toast } = useToast()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(applications.map((app) => app.id))
    } else {
      setSelectedApplications([])
    }
  }

  const handleSelectOne = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, id])
    } else {
      setSelectedApplications(selectedApplications.filter((appId) => appId !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">待处理</Badge>
      case "deposit":
        return <Badge>已付订金</Badge>
      case "completed":
        return <Badge variant="secondary">已付全款</Badge>
      case "cancelled":
        return <Badge variant="destructive">已取消</Badge>
      default:
        return <Badge variant="outline">未知状态</Badge>
    }
  }

  const handleRecordPayment = (application: any) => {
    // 根据当前状态确定要记录的付款类型
    const paymentType = application.status === "pending" ? "订金" : "余款"

    // 更新申请状态
    const newStatus = application.status === "pending" ? "deposit" : "completed"

    // 更新申请列表
    setApplications(
      applications.map((app) =>
        app.id === application.id
          ? {
              ...app,
              status: newStatus,
            }
          : app,
      ),
    )

    // 显示成功提示
    toast({
      title: `${paymentType}支付成功`,
      description: `申请 ${application.id} 的${paymentType}已成功记录`,
    })
  }

  const handleCancelApplication = (application: any) => {
    // 更新申请状态为已取消
    setApplications(
      applications.map((app) =>
        app.id === application.id
          ? {
              ...app,
              status: "cancelled",
            }
          : app,
      ),
    )

    // 显示成功提示
    toast({
      title: "申请已取消",
      description: `申请 ${application.id} 已成功取消`,
    })
  }

  // 添加新申请到列表
  const addNewApplication = (application: any) => {
    setApplications([application, ...applications])
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedApplications.length === applications.length && applications.length > 0}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  aria-label="全选"
                />
              </TableHead>
              <TableHead className="w-[180px]">
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="px-1">
                    <span>申请编号</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>申请责任人</TableHead>
              <TableHead>联系电话</TableHead>
              <TableHead>旅游团</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="px-1">
                    <span>出发日期</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>人数</TableHead>
              <TableHead>订金</TableHead>
              <TableHead>总金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedApplications.includes(application.id)}
                    onCheckedChange={(checked) => handleSelectOne(!!checked, application.id)}
                    aria-label={`选择 ${application.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>{application.responsiblePerson}</TableCell>
                <TableCell>{application.phone}</TableCell>
                <TableCell>{application.tour}</TableCell>
                <TableCell>{format(application.departureDate, "yyyy-MM-dd")}</TableCell>
                <TableCell>
                  {application.adultCount > 0 && `成人: ${application.adultCount}`}
                  {application.childCount > 0 && application.adultCount > 0 && ", "}
                  {application.childCount > 0 && `儿童: ${application.childCount}`}
                </TableCell>
                <TableCell>¥{application.deposit.toLocaleString()}</TableCell>
                <TableCell>¥{application.totalAmount.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">打开菜单</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>操作</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setViewApplication(application)}>
                        <Eye className="mr-2 h-4 w-4" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        编辑申请
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        打印申请书
                      </DropdownMenuItem>

                      {application.status !== "completed" && application.status !== "cancelled" && (
                        <DropdownMenuItem
                          onClick={() => handleRecordPayment(application)}
                          className={application.status === "pending" ? "text-blue-500" : "text-green-500"}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          记录{application.status === "pending" ? "订金" : "余款"}
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />

                      {application.status !== "cancelled" && (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleCancelApplication(application)}
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          取消申请
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewApplication} onOpenChange={(open) => !open && setViewApplication(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>申请详情</DialogTitle>
            <DialogDescription>申请编号: {viewApplication?.id}</DialogDescription>
          </DialogHeader>

          {viewApplication && <ApplicationDetails application={viewApplication} />}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewApplication(null)}>
              关闭
            </Button>
            <Button>编辑申请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
