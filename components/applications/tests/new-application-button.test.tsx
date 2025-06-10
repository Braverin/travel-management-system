import React from "react"
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import { NewApplicationButton } from "../new-application-button"
import '@testing-library/jest-dom'
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}))
jest.mock("@/lib/actions/application-actions", () => ({
  createApplication: jest.fn(async () => ({ success: true, data: { id: "A002" } })),
}))
jest.mock("@/components/ui/select", () => {
  const React = require("react");
  return {
    Select: ({ children }: any) => <div>{children}</div>,
    SelectTrigger: ({ children }: any) => <div>{children}</div>,
    SelectContent: ({ children }: any) => <div>{children}</div>,
    SelectItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    SelectValue: ({ children }: any) => <div>{children}</div>,
  };
})

describe("NewApplicationButton", () => {
  it("渲染新建申请按钮", () => {
    render(<NewApplicationButton />)
    expect(screen.getByText("新建申请")).toBeInTheDocument()
  })

  it("点击按钮弹出表单对话框", () => {
    render(<NewApplicationButton />)
    fireEvent.click(screen.getByText("新建申请"))
    expect(screen.getByText("新建旅游申请")).toBeInTheDocument()
  })

  it.skip("表单填写并提交成功", async () => {
    render(<NewApplicationButton />)
    fireEvent.click(screen.getByText("新建申请"))
    fireEvent.change(screen.getByPlaceholderText("请输入申请责任人姓名"), { target: { value: "李四" } })
    fireEvent.change(screen.getByPlaceholderText("请输入联系电话"), { target: { value: "13900000000" } })
    // 选择旅游团
    fireEvent.mouseDown(screen.getByText("选择旅游团"))
    fireEvent.click(screen.getByText("三亚6日游"))
    // 选择出发日期
    fireEvent.click(screen.getByText("2025-06-15"))
    // 填写成人人数
    fireEvent.change(screen.getByLabelText("成人人数"), { target: { value: "2" } })
    // 填写儿童人数
    fireEvent.change(screen.getByLabelText("儿童人数"), { target: { value: "1" } })
    // 提交表单
    fireEvent.click(screen.getByText("创建申请"))
    await waitForElementToBeRemoved(() => screen.queryByText("新建旅游申请"))
  })
})
