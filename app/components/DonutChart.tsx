"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  title: string;
  value: string;
  color: string;
}

export function DonutChart({ title, value, color }: DonutChartProps) {
  const data = [
    { name: "Value", value: Number.parseInt(value) },
    { name: "Remaining", value: 100 - Number.parseInt(value) },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[120px] w-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={48}
              paddingAngle={0}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell key={`cell-0`} fill={color} />
              <Cell key={`cell-1`} fill="#F3F4F6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
}
