"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { day: "Sun", customers: 60, color: "#F1C40F" },
  { day: "Sun", customers: 40, color: "#FF6B6B" },
  { day: "Sun", customers: 80, color: "#F1C40F" },
  { day: "Sun", customers: 30, color: "#F1C40F" },
  { day: "Sun", customers: 50, color: "#FF6B6B" },
  { day: "Sun", customers: 70, color: "#FF6B6B" },
  { day: "Sun", customers: 60, color: "#FF6B6B" },
];

export function CustomerBarChart() {
  return (
    <ChartContainer
      config={{
        customers: {
          label: "Customers",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[200px]"
    >
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          fontSize={12}
        />
        <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {data.map((entry, index) => (
          <Bar
            key={`bar-${index}`}
            dataKey="customers"
            radius={[4, 4, 0, 0]}
            fill={entry.color}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
