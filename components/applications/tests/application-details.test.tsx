import React from "react"
import { render, screen } from "@testing-library/react"
import { ApplicationDetails } from "../application-details"
import '@testing-library/jest-dom'

describe("ApplicationDetails", () => {
  const mockApplication = {
    id: "A001",
    responsiblePerson: "张三",
    phone: "13800000000",
    applicationDate: new Date("2025-06-01"),
    tour: "三亚6日游",
    departureDate: new Date("2025-06-15"),
    adultCount: 2,
    childCount: 1,
    totalCount: 3,
    deposit: 1000,
    totalAmount: 5000,
    status: "pending",
    depositMethod: "微信",
    balanceMethod: "支付宝",
  }

  it("渲染基本信息tab", () => {
    render(<ApplicationDetails application={mockApplication} />)
    expect(screen.getByText("申请编号")).toBeInTheDocument()
    expect(screen.getByText("张三")).toBeInTheDocument()
    expect(screen.getByText("三亚6日游")).toBeInTheDocument()
    expect(screen.getByText("待处理")).toBeInTheDocument()
  })

  it("渲染参与者信息tab", () => {
    render(<ApplicationDetails application={mockApplication} />)
    expect(screen.getByText("参与者信息")).toBeInTheDocument()
    expect(screen.getByText("申请责任人")).toBeInTheDocument()
  })

  it("渲染支付记录tab", () => {
    render(<ApplicationDetails application={mockApplication} />)
    expect(screen.getByText("支付记录")).toBeInTheDocument()
    expect(screen.getByText("订金")).toBeInTheDocument()
    expect(screen.getByText("余款")).toBeInTheDocument()
  })
})

