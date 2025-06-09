"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { applicationWithAmountsSchema } from "@/lib/validations/application"
import fs from "fs"
import path from "path"

// 模拟数据库中的申请ID计数器
let applicationCounter = 1050

// 创建新申请的Server Action
export async function createApplication(data: z.infer<typeof applicationWithAmountsSchema>) {
  try {
    // 验证数据
    const validatedData = applicationWithAmountsSchema.parse(data)

    // 生成申请ID
    const applicationId = `APP${String(applicationCounter++).padStart(6, "0")}`

    // 构造新申请对象
    const application = {
      id: applicationId,
      ...validatedData,
      // 将日期对象转换为ISO字符串，以便在客户端正确显示
      departureDate: validatedData.departureDate.toISOString(),
      applicationDate: validatedData.applicationDate.toISOString(),
    }

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
