"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "5/1",
    申请数: 12,
    收入: 4000,
  },
  {
    name: "5/5",
    申请数: 18,
    收入: 6800,
  },
  {
    name: "5/10",
    申请数: 15,
    收入: 5600,
  },
  {
    name: "5/15",
    申请数: 22,
    收入: 8900,
  },
  {
    name: "5/20",
    申请数: 20,
    收入: 7800,
  },
  {
    name: "5/25",
    申请数: 25,
    收入: 9500,
  },
  {
    name: "5/30",
    申请数: 30,
    收入: 12000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="申请数" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="收入" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
