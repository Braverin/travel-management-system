"use client"

import { SetStateAction, useState} from "react"
import {Search, Download, RefreshCw} from "lucide-react"
import * as XLSX from "xlsx"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

// 模拟日志数据
const generateLogs = () => {
  const levels = ["info", "warning", "error", "success"]
  const modules = ["用户管理", "申请管理", "支付处理", "系统配置", "数据备份"]
  const actions = ["登录", "创建申请", "记录支付", "修改配置", "数据备份", "用户注销", "删除数据"]
  const users = ["张三", "李四", "王五", "系统"]

  return Array.from({length: 50}).map((_, i) => ({
    id: i + 1,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    level: levels[Math.floor(Math.random() * levels.length)],
    module: modules[Math.floor(Math.random() * modules.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    user: users[Math.floor(Math.random() * users.length)],
    message: `用户执行了${actions[Math.floor(Math.random() * actions.length)]}操作`,
    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
  }))
}

export function SystemLogs() {
  const [logs, setLogs] = useState(generateLogs())
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleFilter, setModuleFilter] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesModule = moduleFilter === "all" || log.module === moduleFilter

    return matchesSearch && matchesModule
  })

  const handleRefresh = () => {
    setLogs(generateLogs())
  }


  const handleExport = () => {
    const excelData = filteredLogs.map((log) => ({
      时间: log.timestamp.toLocaleString(),
      模块: log.module,
      操作: log.action,
      用户: log.user,
      消息: log.message,
    }))
    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "系统日志")
    XLSX.writeFile(wb, `system_logs_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  return (
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
              <Input
                  placeholder="搜索日志..."
                  value={searchTerm}
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="模块" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部模块</SelectItem>
              <SelectItem value="用户管理">用户管理</SelectItem>
              <SelectItem value="申请管理">申请管理</SelectItem>
              <SelectItem value="支付处理">支付处理</SelectItem>
              <SelectItem value="系统配置">系统配置</SelectItem>
              <SelectItem value="数据备份">数据备份</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">时间</TableHead>
              <TableHead className="w-[100px]">模块</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
              <TableHead className="w-[80px]">用户</TableHead>
              <TableHead>消息</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.slice(0, 20).map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">{log.timestamp.toLocaleString()}</TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          显示 {Math.min(20, filteredLogs.length)} 条，共 {filteredLogs.length} 条记录
        </p>
        <p>最后更新：{new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}
