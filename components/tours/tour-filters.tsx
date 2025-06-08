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

export function TourFilters() {
  const [showName, setShowName] = useState(true)
  const [showPrice, setShowPrice] = useState(true)
  const [showParticipants, setShowParticipants] = useState(true)
  const [showDeparture, setShowDeparture] = useState(true)
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
          <DropdownMenuCheckboxItem checked={showName} onCheckedChange={setShowName}>
            旅游团名称
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPrice} onCheckedChange={setShowPrice}>
            价格信息
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showParticipants} onCheckedChange={setShowParticipants}>
            报名情况
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showDeparture} onCheckedChange={setShowDeparture}>
            出发日期
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
            状态
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}