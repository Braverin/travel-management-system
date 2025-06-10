"use client"
import type { Metadata } from "next"
import { CalendarIcon, SearchIcon } from "lucide-react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApplicationTable } from "@/components/applications/application-table"
import { ApplicationFilters } from "@/components/applications/application-filters"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DateRangePicker } from "@/components/date-range-picker"
import { ApplicationStats } from "@/components/applications/application-stats"
import { NewApplicationButton } from "@/components/applications/new-application-button"

export default function ApplicationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="JOJO旅行社" description="查看和管理客户的旅游申请、订金和余款">
        <div className="flex items-center gap-2">
          <NewApplicationButton />
        </div>
      </DashboardHeader>

      <ApplicationStats />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="搜索申请..."
              className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <DateRangePicker />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">全部申请</TabsTrigger>
            <TabsTrigger value="pending">待处理</TabsTrigger>
            <TabsTrigger value="deposit">已付订金</TabsTrigger>
            <TabsTrigger value="completed">已付全款</TabsTrigger>
            <TabsTrigger value="cancelled">已取消</TabsTrigger>
          </TabsList>
          <ApplicationFilters />
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>申请列表</CardTitle>
              <CardDescription>管理所有旅游申请，包括新建、修改和取消</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ApplicationTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>待处理申请</CardTitle>
              <CardDescription>尚未完成处理的旅游申请</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ApplicationTable status="pending" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>已付订金申请</CardTitle>
              <CardDescription>已支付订金但尚未支付全款的申请</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ApplicationTable status="deposit" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>已付全款申请</CardTitle>
              <CardDescription>已完成全部付款的申请</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ApplicationTable status="completed" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>已取消申请</CardTitle>
              <CardDescription>已取消的旅游申请</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ApplicationTable status="cancelled" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
