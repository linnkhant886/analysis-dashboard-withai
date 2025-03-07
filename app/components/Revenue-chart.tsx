"use client"
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue2020: 20, revenue2021: 30 },
  { month: "Feb", revenue2020: 40, revenue2021: 20 },
  { month: "Mar", revenue2020: 30, revenue2021: 50 },
  { month: "Apr", revenue2020: 25, revenue2021: 40 },
  { month: "May", revenue2020: 50, revenue2021: 20 },
  { month: "Jun", revenue2020: 40, revenue2021: 60 },
  { month: "Jul", revenue2020: 30, revenue2021: 40 },
  { month: "Aug", revenue2020: 40, revenue2021: 30 },
  { month: "Sep", revenue2020: 50, revenue2021: 40 },
  { month: "Oct", revenue2020: 40, revenue2021: 60 },
  { month: "Nov", revenue2020: 30, revenue2021: 40 },
  { month: "Dec", revenue2020: 40, revenue2021: 50 },
]

export function RevenueChart() {
  return (
    <ChartContainer
      config={{
        revenue2020: {
          label: "2020",
          color: "#3498DB",
        },
        revenue2021: {
          label: "2021",
          color: "#FF6B6B",
        },
      }}
      className="h-[200px]"
    >
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
        <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} tickFormatter={(value) => `$${value}k`} />
        <Tooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="revenue2020"
          stroke="#3498DB"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#3498DB", stroke: "white", strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="revenue2021"
          stroke="#FF6B6B"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#FF6B6B", stroke: "white", strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

