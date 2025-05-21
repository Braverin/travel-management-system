"use client"

import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function ApplicationFilters() {
  const [showResponsiblePerson, setShowResponsiblePerson] = useState(true)
  const [showPhone, setShowPhone] = useState(true)
  const [showTour, setShowTour] = useState(true)
  const [showDepartureDate, setShowDepartureDate] = useState(true)
  const [showPersonCount, setShowPersonCount] = useState(true)
  const [showDeposit, setShowDeposit] = useState(true)
  const [showTotalAmount, setShowTotalAmount] = useState(true)
  const [showStatus, setShowStatus] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <Filter className="mr-2 h-4 w-4" />
          筛选
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>显示列</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showResponsiblePerson} onCheckedChange={setShowResponsiblePerson}>
          申请责任人
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPhone} onCheckedChange={setShowPhone}>
          联系电话
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showTour} onCheckedChange={setShowTour}>
          旅游团
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showDepartureDate} onCheckedChange={setShowDepartureDate}>
          出发日期
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPersonCount} onCheckedChange={setShowPersonCount}>
          人数
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showDeposit} onCheckedChange={setShowDeposit}>
          订金
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showTotalAmount} onCheckedChange={setShowTotalAmount}>
          总金额
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
          状态
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
