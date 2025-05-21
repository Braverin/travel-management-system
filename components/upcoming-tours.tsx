import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function UpcomingTours() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">三亚6日游</p>
            <p className="text-xs text-muted-foreground">6月15日出发</p>
          </div>
          <Badge>剩余3天</Badge>
        </div>
        <Progress value={85} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>已报名: 17人</p>
          <p>限额: 20人</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">北京5日游</p>
            <p className="text-xs text-muted-foreground">6月20日出发</p>
          </div>
          <Badge>剩余8天</Badge>
        </div>
        <Progress value={60} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>已报名: 12人</p>
          <p>限额: 20人</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">厦门4日游</p>
            <p className="text-xs text-muted-foreground">6月25日出发</p>
          </div>
          <Badge>剩余13天</Badge>
        </div>
        <Progress value={40} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>已报名: 8人</p>
          <p>限额: 20人</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">云南8日游</p>
            <p className="text-xs text-muted-foreground">7月1日出发</p>
          </div>
          <Badge>剩余19天</Badge>
        </div>
        <Progress value={25} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>已报名: 5人</p>
          <p>限额: 20人</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">桂林7日游</p>
            <p className="text-xs text-muted-foreground">7月10日出发</p>
          </div>
          <Badge>剩余28天</Badge>
        </div>
        <Progress value={15} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <p>已报名: 3人</p>
          <p>限额: 20人</p>
        </div>
      </div>
    </div>
  )
}
