import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentApplications } from "@/components/recent-applications"
import { UpcomingTours } from "@/components/upcoming-tours"
import { Overview } from "@/components/overview"
import { NewApplicationButton } from "@/components/applications/new-application-button"

export default function DashboardPage() {
  return (
    <>
      <DashboardShell>
        <DashboardHeader
          heading="XXX旅行社业务管理系统"
          description="欢迎使用旅游业务管理系统，管理您的旅游团和客户申请"
        >
          <div className="flex items-center gap-2">
            <NewApplicationButton />
          </div>
        </DashboardHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">业务概览</TabsTrigger>
            <TabsTrigger value="applications">申请管理</TabsTrigger>
            <TabsTrigger value="tours">旅游团管理</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>业务概览</CardTitle>
                  <CardDescription>近30天业务申请和收入情况</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>即将出发的旅游团</CardTitle>
                  <CardDescription>未来7天内出发的旅游团</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingTours />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                  <CardDescription>常用业务操作入口</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex items-center p-3 rounded-lg hover:bg-muted">
                    <div className="flex-1">
                      <div className="font-medium">新建申请</div>
                      <div className="text-sm text-muted-foreground">为客户创建新的旅游申请</div>
                    </div>
                    <NewApplicationButton />
                  </div>
                  <Link href="/payments" className="flex items-center p-3 rounded-lg hover:bg-muted">
                    <div>
                      <div className="font-medium">余款收取</div>
                      <div className="text-sm text-muted-foreground">记录客户余款支付情况</div>
                    </div>
                  </Link>
                  <Link href="/tours/manage" className="flex items-center p-3 rounded-lg hover:bg-muted">
                    <div>
                      <div className="font-medium">旅游路线管理</div>
                      <div className="text-sm text-muted-foreground">管理旅游路线和活动</div>
                    </div>
                  </Link>
                  <Link href="/pricing" className="flex items-center p-3 rounded-lg hover:bg-muted">
                    <div>
                      <div className="font-medium">价格设定</div>
                      <div className="text-sm text-muted-foreground">设定和调整旅游团价格</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>最近申请</CardTitle>
                  <CardDescription>最近处理的旅游申请</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentApplications />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>申请管理</CardTitle>
                <CardDescription>管理客户的旅游申请，包括新建、修改和取消</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">在此页面可以查看和管理所有旅游申请。</p>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>新建申请</span>
                    </div>
                    <NewApplicationButton />
                  </div>
                  <Button variant="outline" className="justify-start">
                    订金管理
                  </Button>
                  <Button variant="outline" className="justify-start">
                    余款管理
                  </Button>
                  <Button variant="outline" className="justify-start">
                    申请变更/取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tours" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>旅游团管理</CardTitle>
                <CardDescription>管理旅游路线、活动和价格</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">在此页面可以管理所有旅游路线和活动。</p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" className="justify-start">
                    旅游路线管理
                  </Button>
                  <Button variant="outline" className="justify-start">
                    旅游活动管理
                  </Button>
                  <Button variant="outline" className="justify-start">
                    价格设定
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
