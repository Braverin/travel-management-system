import type { Metadata } from "next"
import { CalendarIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TourTable } from "@/components/tours/tour-table"
import { TourFilters } from "@/components/tours/tour-filters"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DateRangePicker } from "@/components/date-range-picker"
import { TourStats } from "@/components/tours/tour-stats"
import { NewTourButton } from "@/components/tours/new-tour-button"

export const metadata: Metadata = {
  title: "旅游团管理 | JOJO旅行社业务管理系统",
  description: "管理旅游团信息、价格和出发日期",
}

export default function ToursPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="旅游团管理" description="管理旅游团信息、价格设置和出发日期安排">
        <div className="flex items-center gap-2">
          <NewTourButton />
        </div>
      </DashboardHeader>

      <TourStats />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="搜索旅游团..."
              className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <DateRangePicker />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            批量设置日期
          </Button>
          <TourFilters />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">全部旅游团</TabsTrigger>
            <TabsTrigger value="published">已发布</TabsTrigger>
            <TabsTrigger value="draft">草稿</TabsTrigger>
            <TabsTrigger value="paused">已暂停</TabsTrigger>
            <TabsTrigger value="cancelled">已取消</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>旅游团列表</CardTitle>
              <CardDescription>管理所有旅游团，包括新建、编辑和状态管理</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TourTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>已发布旅游团</CardTitle>
              <CardDescription>正在接受申请的旅游团</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TourTable status="published" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>草稿旅游团</CardTitle>
              <CardDescription>尚未发布的旅游团</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TourTable status="draft" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paused" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>已暂停旅游团</CardTitle>
              <CardDescription>暂停接受申请的旅游团</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TourTable status="paused" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>已取消旅游团</CardTitle>
              <CardDescription>已取消的旅游团</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <TourTable status="cancelled" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
