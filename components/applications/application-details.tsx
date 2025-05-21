import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ApplicationDetailsProps {
  application: any
}

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
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

  // 模拟参与者数据
  const participants = Array.from({ length: application.totalCount }).map((_, i) => {
    const isAdult = i < application.adultCount
    return {
      id: i + 1,
      name: i === 0 ? application.responsiblePerson : `参与者 ${i}`,
      isResponsible: i === 0,
      type: isAdult ? "成人" : "儿童",
      idNumber: `${isAdult ? "3" : "4"}${Math.floor(Math.random() * 9) + 1}${Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("")}`,
      phone:
        i === 0
          ? application.phone
          : `1${Math.floor(Math.random() * 9) + 1}${Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("")}`,
    }
  })

  // 模拟支付记录
  const payments = [
    {
      id: 1,
      type: "订金",
      amount: application.deposit,
      date: new Date(application.applicationDate.getTime() + 1000 * 60 * 60 * 24),
      method: "现金",
      status: "已支付",
    },
  ]

  if (application.status === "completed") {
    payments.push({
      id: 2,
      type: "余款",
      amount: application.totalAmount - application.deposit,
      date: new Date(application.departureDate.getTime() - 1000 * 60 * 60 * 24 * 15),
      method: "银行转账",
      status: "已支付",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="participants">参与者信息</TabsTrigger>
          <TabsTrigger value="payments">支付记录</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">申请编号</h3>
                <p className="text-sm">{application.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">申请责任人</h3>
                <p className="text-sm">{application.responsiblePerson}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">联系电话</h3>
                <p className="text-sm">{application.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">申请日期</h3>
                <p className="text-sm">{format(application.applicationDate, "yyyy-MM-dd")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">旅游团</h3>
                <p className="text-sm">{application.tour}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">出发日期</h3>
                <p className="text-sm">{format(application.departureDate, "yyyy-MM-dd")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">人数</h3>
                <p className="text-sm">
                  {application.adultCount > 0 && `成人: ${application.adultCount}`}
                  {application.childCount > 0 && application.adultCount > 0 && ", "}
                  {application.childCount > 0 && `儿童: ${application.childCount}`}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">状态</h3>
                <div className="mt-1">{getStatusBadge(application.status)}</div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">费用信息</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">订金</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">¥{application.deposit.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">余款</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    ¥{(application.totalAmount - application.deposit).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">总金额</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">¥{application.totalAmount.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="participants" className="pt-4">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left text-sm font-medium">序号</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">姓名</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">类型</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">身份证号</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">联系电话</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">备注</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id} className="border-b">
                    <td className="py-3 px-4 text-sm">{participant.id}</td>
                    <td className="py-3 px-4 text-sm">{participant.name}</td>
                    <td className="py-3 px-4 text-sm">{participant.type}</td>
                    <td className="py-3 px-4 text-sm">{participant.idNumber}</td>
                    <td className="py-3 px-4 text-sm">{participant.phone}</td>
                    <td className="py-3 px-4 text-sm">
                      {participant.isResponsible && <Badge variant="outline">申请责任人</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="pt-4">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left text-sm font-medium">序号</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">类型</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">金额</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">支付日期</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">支付方式</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">状态</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-3 px-4 text-sm">{payment.id}</td>
                    <td className="py-3 px-4 text-sm">{payment.type}</td>
                    <td className="py-3 px-4 text-sm">¥{payment.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{format(payment.date, "yyyy-MM-dd")}</td>
                    <td className="py-3 px-4 text-sm">{payment.method}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline">{payment.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
