"use client"

import { useState } from "react"
import { Save, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
export function SystemConfig() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [config, setConfig] = useState({
    companyName: "XXX旅行社",
    companyAddress: "北京市朝阳区xxx街道xxx号",
    companyPhone: "010-12345678",
    companyEmail: "contact@xxx-travel.com",
    depositRate60Days: 300,
    depositRate30Days: 500,
    depositRate15Days: 800,
    depositRate7Days: 1000,
    depositRateDefault: 1500,
    cancellationPolicy: "出发前7天取消收取20%手续费，出发前3天取消收取50%手续费，出发当天取消不予退款。",
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "配置保存成功",
        description: "系统配置已更新",
      })
    } catch (error) {
      toast({
        title: "保存失败",
        description: "保存配置时发生错误，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setConfig({
      companyName: "XXX旅行社",
      companyAddress: "北京市朝阳区xxx街道xxx号",
      companyPhone: "010-12345678",
      companyEmail: "contact@xxx-travel.com",
      depositRate60Days: 300,
      depositRate30Days: 500,
      depositRate15Days: 800,
      depositRate7Days: 1000,
      depositRateDefault: 1500,
      cancellationPolicy: "出发前7天取消收取20%手续费，出发前3天取消收取50%手续费，出发当天取消不予退款。",
    })

    toast({
      title: "配置已重置",
      description: "所有配置已恢复为默认值",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>公司信息</CardTitle>
          <CardDescription>设置公司基本信息，将显示在申请书和凭证中</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">公司名称</Label>
              <Input
                id="companyName"
                value={config.companyName}
                onChange={(e: { target: { value: any } }) => setConfig({ ...config, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyPhone">联系电话</Label>
              <Input
                id="companyPhone"
                value={config.companyPhone}
                onChange={(e: { target: { value: any } }) => setConfig({ ...config, companyPhone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">公司地址</Label>
            <Input
              id="companyAddress"
              value={config.companyAddress}
              onChange={(e: { target: { value: any } }) => setConfig({ ...config, companyAddress: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyEmail">联系邮箱</Label>
            <Input
              id="companyEmail"
              type="email"
              value={config.companyEmail}
              onChange={(e: { target: { value: any } }) => setConfig({ ...config, companyEmail: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>订金费率设置</CardTitle>
          <CardDescription>根据距离出发日期的天数设置不同的订金费率</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="depositRate60Days">60天以上（成人）</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="depositRate60Days"
                  type="number"
                  value={config.depositRate60Days}
                  onChange={(e: { target: { value: any } }) => setConfig({ ...config, depositRate60Days: Number(e.target.value) })}
                />
                <span className="text-sm text-muted-foreground">元</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositRate30Days">30-59天（成人）</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="depositRate30Days"
                  type="number"
                  value={config.depositRate30Days}
                  onChange={(e: { target: { value: any } }) => setConfig({ ...config, depositRate30Days: Number(e.target.value) })}
                />
                <span className="text-sm text-muted-foreground">元</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositRate15Days">15-29天（成人）</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="depositRate15Days"
                  type="number"
                  value={config.depositRate15Days}
                  onChange={(e: { target: { value: any } }) => setConfig({ ...config, depositRate15Days: Number(e.target.value) })}
                />
                <span className="text-sm text-muted-foreground">元</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositRate7Days">7-14天（成人）</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="depositRate7Days"
                  type="number"
                  value={config.depositRate7Days}
                  onChange={(e: { target: { value: any } }) => setConfig({ ...config, depositRate7Days: Number(e.target.value) })}
                />
                <span className="text-sm text-muted-foreground">元</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositRateDefault">7天以内（成人）</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="depositRateDefault"
                  type="number"
                  value={config.depositRateDefault}
                  onChange={(e: { target: { value: any } }) => setConfig({ ...config, depositRateDefault: Number(e.target.value) })}
                />
                <span className="text-sm text-muted-foreground">元</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">儿童订金费率为成人费率的60%，系统将自动计算</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>取消政策</CardTitle>
          <CardDescription>设置旅游申请的取消和退款政策</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cancellationPolicy">取消政策说明</Label>
            <Textarea
              id="cancellationPolicy"
              value={config.cancellationPolicy}
              onChange={(e: { target: { value: any } }) => setConfig({ ...config, cancellationPolicy: e.target.value })}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          重置
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          保存配置
        </Button>
      </div>
    </div>
  )
}
