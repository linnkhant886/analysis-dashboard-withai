"use client";
import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import dynamic from "next/dynamic";

const ExportPDFButton = dynamic(
  () => import("../../components/ExportPDFButton"),
  {
    ssr: false,
  }
);

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  width?: number;
  height?: number;
}

// Sample data for age group segmentation (March 2025)
// Values represent percentages of a total (e.g., 100 bookings)
const ageGroupData = [
  { label: "Child (0-12)", value: 40, color: "#FF6B6B" },
  { label: "Adult (13-30)", value: 78, color: "#2ECC71" },
  { label: "Middle Age (31-60)", value: 80, color: "#3498DB" },
  { label: "Elder (61+)", value: 30, color: "#9B59B6" },
];

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 240,
  height = 240,
}) => {
  const total = 100; // Total percentage
  const remainingValue = total - data[0].value;
  const chartData = [
    { label: data[0].label, value: data[0].value, color: data[0].color },
    { label: "Remaining", value: remainingValue, color: "#E5E7EB" }, // Gray for unfilled portion
  ];

  return (
    <ChartContainer
      config={{
        value: {
          label: data[0]?.label || "Unknown",
          color: data[0]?.color || "#8884d8",
        },
      }}
      className="h-[300px] w-full"
    >
      <PieChart width={width} height={height}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          labelLine={true}
          label={({ value, index }) =>
            index === 0 ? `${value}%  ${data[0].label}` : ""
          } // Show label only for the filled segment
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  );
};

const Dashboard = () => {
  const ageGroupRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ageGroupRef} className=" w-full p-2">
      {/* Age Group Segmentation Card */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Age Group Segmentation (March 2025)
          </CardTitle>
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Bookings by age group: Child, Adult, Middle Age, Elder
            </p>

            <ExportPDFButton
              contentRef={ageGroupRef}
              fileName="age_group_report"
              buttonText="Export File"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {ageGroupData.map((item) => (
              <div key={item.label} className="w-full ">
                <DonutChart
                  data={[
                    { label: item.label, value: item.value, color: item.color },
                  ]}
                  width={240}
                  height={240}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
