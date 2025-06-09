"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, FileText, CreditCard, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import * as XLSX from "xlsx"
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
import { cancelApplication, updateApplicationStatus, getApplicationById } from "@/lib/actions/application-actions"

interface ApplicationTableProps {
  status?: string
}

export function ApplicationTable({ status }: ApplicationTableProps) {
  const [applications, setApplications] = useState<any[]>([])
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const [viewApplication, setViewApplication] = useState<any | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/applications.json")
      .then(res => res.json())
      .then(res => {
        let data = res || []
        // 如果有 status 过滤，前端过滤
        if (status && status !== "all") {
          data = data.filter((item: any) => item.status === status)
        }
        setApplications(data)
      })
  }, [status])

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

  // 记录定金/全款，写入 applications.json
  const handleRecordPayment = async (application: any) => {
    const paymentType = application.status === "pending" ? "订金" : "余款"
    const newStatus = application.status === "pending" ? "deposit" : "completed"
    await updateApplicationStatus(application.id, newStatus)
    // 重新拉取最新数据，保证和json文件同步
    fetch("/applications.json")
      .then(res => res.json())
      .then(res => {
        let data = res || []
        if (status && status !== "all") {
          data = data.filter((item: any) => item.status === status)
        }
        setApplications(data)
      })
    toast({
      title: `${paymentType}支付成功`,
      description: `申请 ${application.id} 的${paymentType}已成功记录`,
    })
  }

  // 取消申请（写入 applications.json）
  const handleCancelApplication = async (application: any) => {
    await cancelApplication(application.id)
    // 取消后重新拉取最新数据，避免本地状态错乱
    fetch("/applications.json")
      .then(res => res.json())
      .then(res => {
        let data = res || []
        if (status && status !== "all") {
          data = data.filter((item: any) => item.status === status)
        }
        setApplications(data)
      })
    toast({
      title: "申请已取消",
      description: `申请 ${application.id} 已成功取消`,
    })
  }

  // 修改订单状态
  const handleUpdateStatus = async (application: any, newStatus: string) => {
    await updateApplicationStatus(application.id, newStatus)
    setApplications(
      applications.map((app) =>
        app.id === application.id
          ? { ...app, status: newStatus }
          : app,
      ),
    )
    toast({
      title: "订单状态已更新",
      description: `申请 ${application.id} 状态已修改为 ${newStatus}`,
    })
  }

  // 查看订单详情（从json文件获取最新数据）
  const handleViewDetails = async (application: any) => {
    const detail = await getApplicationById(application.id)
    setViewApplication(detail)
  }

  // 导出为 Excel
  const handleExport = () => {
    const excelData = applications.map(app => ({
      申请编号: app.id,
      申请责任人: app.responsiblePerson,
      联系电话: app.phone,
      旅游团: app.tour,
      出发日期: format(app.departureDate, "yyyy-MM-dd"),
      成人数: app.adultCount,
      儿童数: app.childCount,
      总人数: app.totalCount,
      订金: app.deposit,
      总金额: app.totalAmount,
      状态: app.status,
    }))
    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "申请列表")
    XLSX.writeFile(wb, `applications_${new Date().toISOString().split("T")[0]}.xlsx`)
  }


  // 添加新申请到列表
  const addNewApplication = (application: any) => {
    setApplications([application, ...applications])
  }

  return (
      <>
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            导出Excel
          </Button>
        </div>
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
                      <ArrowUpDown className="ml-1 h-4 w-4"/>
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
                      <ArrowUpDown className="ml-1 h-4 w-4"/>
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
                            <MoreHorizontal className="h-4 w-4"/>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(application)}>
                            <Eye className="mr-2 h-4 w-4"/>
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4"/>
                            编辑申请
                          </DropdownMenuItem>
                          <DropdownMenuSeparator/>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4"/>
                            打印申请书
                          </DropdownMenuItem>

                          {application.status !== "completed" && application.status !== "cancelled" && (
                              <DropdownMenuItem
                                  onClick={() => handleRecordPayment(application)}
                                  className={application.status === "pending" ? "text-blue-500" : "text-green-500"}
                              >
                                <CreditCard className="mr-2 h-4 w-4"/>
                                记录{application.status === "pending" ? "订金" : "余款"}
                              </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator/>

                          {application.status !== "cancelled" && (
                              <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleCancelApplication(application)}
                              >
                                <AlertTriangle className="mr-2 h-4 w-4"/>
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

            {viewApplication && <ApplicationDetails application={viewApplication}/>}

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
