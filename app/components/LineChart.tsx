"use client"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { day: "Sunday", orders: 10 },
  { day: "Monday", orders: 30 },
  { day: "Tuesday", orders: 15 },
  { day: "Wednesday", orders: 35 },
  { day: "Thursday", orders: 20 },
  { day: "Friday", orders: 25 },
  { day: "Saturday", orders: 18 },
]

export function LineChartComponent() {
  return (
    <ChartContainer
      config={{
        orders: {
          label: "Orders",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px]"
    >
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3498DB" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3498DB" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
        <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} hide />
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
        <Tooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#3498DB"
          fillOpacity={1}
          fill="url(#colorOrders)"
          activeDot={{ r: 6, fill: "#3498DB", stroke: "white", strokeWidth: 2 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}

