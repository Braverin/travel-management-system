"use client"

import { SetStateAction, useState} from "react"
import {Plus, Search, MoreHorizontal, Edit, Trash2} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

// 模拟用户数据
const generateUsers = () => {
  const roles = ["admin", "manager", "operator"]
  const statuses = ["active", "inactive", "locked"]
  const names = ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"]

  return Array.from({length: 8}).map((_, i) => ({
    id: `USER${String(i + 1001).padStart(4, "0")}`,
    username: `user${i + 1}`,
    name: names[i],
    email: `user${i + 1}@xxx-travel.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
  }))
}

export function UserManagement() {
  const [users, setUsers] = useState(generateUsers())
  const [searchTerm, setSearchTerm] = useState("")
  const {toast} = useToast()

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":

        return <Badge>系统管理员</Badge>
      case "manager":
        return <Badge>业务经理</Badge>
      case "operator":
        return <Badge>操作员</Badge>
      default:
        return <Badge>未知角色</Badge>
    }
  }

  const filteredUsers = users.filter(
      (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
              <Input
                  placeholder="搜索用户..."
                  value={searchTerm}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新建用户
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>最后登录</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user.lastLogin.toLocaleDateString()}</TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        编辑用户
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除用户
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
