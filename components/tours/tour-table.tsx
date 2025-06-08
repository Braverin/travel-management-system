"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Calendar, Play, Pause, Trash2 } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// 模拟数据
const generateTours = (count: number, status?: string) => {
  const statuses = ["published", "draft", "paused", "cancelled"]
  const tourNames = [
    "三亚6日游",
    "北京5日游",
    "厦门4日游",
    "云南8日游",
    "桂林7日游",
    "上海3日游",
    "西藏10日游",
    "青岛5日游",
    "成都7日游",
    "杭州4日游",
  ]

  return Array.from({ length: count }).map((_, i) => {
    const tourStatus = status || statuses[Math.floor(Math.random() * statuses.length)]
    const maxParticipants = Math.floor(Math.random() * 30) + 20
    const currentParticipants = Math.floor(Math.random() * maxParticipants)

    return {
      id: `TOUR${String(i + 1001).padStart(4, "0")}`,
      name: tourNames[Math.floor(Math.random() * tourNames.length)],
      description: "精心安排的旅游行程，包含住宿、交通和景点门票",
      adultPrice: Math.floor(Math.random() * 3000) + 2000,
      childPrice: Math.floor(Math.random() * 1500) + 1000,
      maxParticipants,
      currentParticipants,
      departureCount: Math.floor(Math.random() * 5) + 1,
      nextDeparture: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000),
      status: tourStatus,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    }
  })
}

interface TourTableProps {
  status?: string
}

export function TourTable({ status }: TourTableProps) {
  const [tours, setTours] = useState(generateTours(15, status))
  const [selectedTours, setSelectedTours] = useState<string[]>([])
  const { toast } = useToast()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTours(tours.map((tour) => tour.id))
    } else {
      setSelectedTours([])
    }
  }

  const handleSelectOne = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedTours([...selectedTours, id])
    } else {
      setSelectedTours(selectedTours.filter((tourId) => tourId !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge>已发布</Badge>
      case "draft":
        return <Badge variant="outline">草稿</Badge>
      case "paused":
        return <Badge variant="secondary">已暂停</Badge>
      case "cancelled":
        return <Badge variant="destructive">已取消</Badge>
      default:
        return <Badge variant="outline">未知状态</Badge>
    }
  }

  const handleStatusChange = (tour: any, newStatus: string) => {
    setTours(
      tours.map((t) =>
        t.id === tour.id
          ? {
              ...t,
              status: newStatus,
            }
          : t,
      ),
    )

    const statusText =
      {
        published: "发布",
        paused: "暂停",
        cancelled: "取消",
      }[newStatus] || newStatus

    toast({
      title: `旅游团${statusText}成功`,
      description: `旅游团 ${tour.name} 已${statusText}`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTours.length === tours.length && tours.length > 0}
                onCheckedChange={(checked: any) => handleSelectAll(!!checked)}
                aria-label="全选"
              />
            </TableHead>
            <TableHead className="w-[120px]">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="px-1">
                  <span>编号</span>
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>旅游团名称</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>报名情况</TableHead>
            <TableHead>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="px-1">
                  <span>下次出发</span>
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>出发批次</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTours.includes(tour.id)}
                  onCheckedChange={(checked: any) => handleSelectOne(!!checked, tour.id)}
                  aria-label={`选择 ${tour.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{tour.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{tour.name}</div>
                  <div className="text-sm text-muted-foreground">{tour.description.slice(0, 30)}...</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>成人: ¥{tour.adultPrice.toLocaleString()}</div>
                  <div className="text-muted-foreground">儿童: ¥{tour.childPrice.toLocaleString()}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{tour.currentParticipants}人</span>
                    <span>{tour.maxParticipants}人</span>
                  </div>
                  <Progress value={(tour.currentParticipants / tour.maxParticipants) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((tour.currentParticipants / tour.maxParticipants) * 100)}% 满团率
                  </div>
                </div>
              </TableCell>
              <TableCell>{format(tour.nextDeparture, "yyyy-MM-dd")}</TableCell>
              <TableCell>
                <Badge variant="outline">{tour.departureCount} 个批次</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(tour.status)}</TableCell>
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      查看详情
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      编辑旅游团
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      管理日期
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {tour.status === "published" && (
                      <DropdownMenuItem onClick={() => handleStatusChange(tour, "paused")}>
                        <Pause className="mr-2 h-4 w-4" />
                        暂停招募
                      </DropdownMenuItem>
                    )}

                    {tour.status === "paused" && (
                      <DropdownMenuItem onClick={() => handleStatusChange(tour, "published")}>
                        <Play className="mr-2 h-4 w-4" />
                        恢复招募
                      </DropdownMenuItem>
                    )}

                    {(tour.status === "draft" || tour.status === "paused") && (
                      <DropdownMenuItem onClick={() => handleStatusChange(tour, "published")}>
                        <Play className="mr-2 h-4 w-4" />
                        发布旅游团
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    {tour.status !== "cancelled" && (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleStatusChange(tour, "cancelled")}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        取消旅游团
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
  )
}
