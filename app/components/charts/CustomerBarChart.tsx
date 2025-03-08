"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const canceledData = [
  { day: "Mar 1", cancellations: 5, color: "#E52020" }, // Red shade
  { day: "Mar 2", cancellations: 1, color: "#E52020" },
  { day: "Mar 3", cancellations: 4, color: "#E52020" },
  { day: "Mar 4", cancellations: 6, color: "#E52020" },
  { day: "Mar 5", cancellations: 2, color: "#E52020" },
  { day: "Mar 6", cancellations: 15, color: "#E52020" },
  { day: "Mar 7", cancellations: 8, color: "#E52020" },
  { day: "Mar 8", cancellations: 3, color: "#E52020" },
];

export function CustomerBarChart() {
  return (
    <ChartContainer
      config={{
        cancellations: {
          label: "Cancellations",
          color: "#E52020",
        },
      }}
      className="h-[200px]  w-full "
    > 
      <BarChart
        data={canceledData}
        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          fontSize={12}
          interval={0} // Ensures all labels are shown
          angle={0} // Prevents rotation if labels overlap
          textAnchor="middle" // Centers text under bars
          
        />
        <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={12} />
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="cancellations" radius={[4, 4, 0, 0]} fill="#E52020" />
      </BarChart>
    </ChartContainer>
  );
}
