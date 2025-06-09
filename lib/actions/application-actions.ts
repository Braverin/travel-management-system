"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { applicationWithAmountsSchema } from "@/lib/validations/application"
import fs from "fs"
import path from "path"

// 创建新申请的Server Action
export async function createApplication(data: z.infer<typeof applicationWithAmountsSchema>) {
  try {
    // 验证数据
    const validatedData = applicationWithAmountsSchema.parse(data)

    // 读取 applications.json
    const filePath = path.join(process.cwd(), "public", "applications.json")
    let applications = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8")
      try {
        applications = JSON.parse(fileContent)
      } catch {
        applications = []
      }
    }
    // 自动查找最大id，生成唯一id（从所有申请中最大编号+1）
    let maxIdNum = 0
    applications.forEach((app: any) => {
      const match = String(app.id).match(/APP(\d{6})/)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxIdNum) maxIdNum = num
      }
    })
    const applicationId = `APP${String(maxIdNum + 1).padStart(6, "0")}`

    // 通过tourId查找tour名称
    const tours = [
      { id: "sanya", name: "三亚6日游" },
      { id: "beijing", name: "北京5日游" },
      { id: "xiamen", name: "厦门4日游" },
      { id: "yunnan", name: "云南8日游" },
      { id: "guilin", name: "桂林7日游" },
    ]
    const tourObj = tours.find(t => t.id === validatedData.tourId)
    const tourName = tourObj ? tourObj.name : validatedData.tourId

    // 随机生成支付方式
    const paymentMethods = ["现金", "微信", "支付宝", "银行卡"]
    function getRandomMethod() {
      return paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
    }
    let depositMethod: string | undefined = undefined
    let balanceMethod: string | undefined = undefined
    if (validatedData.status === "pending" || validatedData.status === "deposit") {
      depositMethod = getRandomMethod()
    } else if (validatedData.status === "completed") {
      depositMethod = getRandomMethod()
      balanceMethod = getRandomMethod()
    }
    // 构造新申请对象，存储tour名称
    const application = {
      id: applicationId,
      ...validatedData,
      tour: tourName,
      totalCount: validatedData.adultCount + validatedData.childCount, // 保证有 totalCount 字段
      departureDate: validatedData.departureDate.toISOString(),
      applicationDate: validatedData.applicationDate.toISOString(),
      ...(depositMethod ? { depositMethod } : {}),
      ...(balanceMethod ? { balanceMethod } : {}),
    }

    // 追加新申请
    applications.push(application)
    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2), "utf-8")

    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 刷新申请列表页面
    revalidatePath("/applications")

    return {
      success: true,
      data: application,
    }
  } catch (error) {
    console.error("创建申请失败:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "表单数据验证失败，请检查输入",
      }
    }

    return {
      success: false,
      error: "创建申请时发生错误，请稍后重试",
    }
  }
}

// 修改订单状态
export async function updateApplicationStatus(applicationId: string, newStatus: string) {
  const filePath = path.join(process.cwd(), "public", "applications.json")
  let applications = []
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8")
    try {
      applications = JSON.parse(fileContent)
    } catch {
      applications = []
    }
  }
  const updatedApplications = applications.map((app: any) =>
    app.id === applicationId ? { ...app, status: newStatus } : app
  )
  fs.writeFileSync(filePath, JSON.stringify(updatedApplications, null, 2), "utf-8")
  revalidatePath("/applications")
  return true
}

// 取消申请（本质上是修改状态为cancelled）
export async function cancelApplication(applicationId: string) {
  return updateApplicationStatus(applicationId, "cancelled")
}

// 获取申请详情
export async function getApplicationById(applicationId: string) {
  const filePath = path.join(process.cwd(), "public", "applications.json")
  if (!fs.existsSync(filePath)) return null
  const fileContent = fs.readFileSync(filePath, "utf-8")
  let applications = []
  try {
    applications = JSON.parse(fileContent)
  } catch {
    applications = []
  }
  return applications.find((app: any) => app.id === applicationId) || null
}
