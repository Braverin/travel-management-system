import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentApplications() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>张</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">张三</p>
          <p className="text-sm text-muted-foreground">三亚6日游 (6月15日出发)</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge>已付订金</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>李</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">李四</p>
          <p className="text-sm text-muted-foreground">云南8日游 (7月1日出发)</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline">待付订金</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>王</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">王五</p>
          <p className="text-sm text-muted-foreground">北京5日游 (6月20日出发)</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="secondary">已付全款</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>赵</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">赵六</p>
          <p className="text-sm text-muted-foreground">桂林7日游 (7月10日出发)</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="destructive">已取消</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>钱</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">钱七</p>
          <p className="text-sm text-muted-foreground">厦门4日游 (6月25日出发)</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge>已付订金</Badge>
        </div>
      </div>
    </div>
  )
}
