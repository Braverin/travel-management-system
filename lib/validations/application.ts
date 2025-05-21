import { z } from "zod"

export const applicationSchema = z.object({
  responsiblePerson: z
    .string()
    .min(2, { message: "申请责任人姓名至少需要2个字符" })
    .max(50, { message: "申请责任人姓名不能超过50个字符" }),
  phone: z
    .string()
    .min(11, { message: "请输入有效的手机号码" })
    .max(11, { message: "请输入有效的手机号码" })
    .regex(/^1[3-9]\d{9}$/, { message: "请输入有效的手机号码" }),
  tourId: z.string({ required_error: "请选择旅游团" }),
  departureDate: z.date({ required_error: "请选择出发日期" }),
  adultCount: z.number().min(1, { message: "成人人数至少为1人" }).max(20, { message: "成人人数不能超过20人" }),
  childCount: z.number().min(0, { message: "儿童人数不能为负数" }).max(10, { message: "儿童人数不能超过10人" }),
})

export const applicationWithAmountsSchema = applicationSchema.extend({
  deposit: z.number(),
  totalAmount: z.number(),
  status: z.enum(["pending", "deposit", "completed", "cancelled"]),
  applicationDate: z.date(),
})
