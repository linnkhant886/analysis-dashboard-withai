"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

// Placeholder data for March 2025
const topUnits = [
  { name: "Unit A", bookings: 400, color: "#4F46E5" }, // Indigo shade
  { name: "Unit B", bookings: 360, color: "#8B5CF6" }, // Purple shade
  { name: "Unit C", bookings: 319, color: "#A855F7" }, // Deeper purple shade
];

const FrequentUnitsCard = () => {
  // Calculate total bookings
  const totalBookings = topUnits.reduce((sum, unit) => sum + unit.bookings, 0);

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Most Booked Units (March 2025)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div>
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <h3 className="text-2xl font-bold">{totalBookings}</h3>
        </div>

        {/* Pie Chart */}
        <ChartContainer
          config={
            {
              /* your chart config here */
            }
          }
          className="h-[215px]  "
        >
          <PieChart width={400} height={400}>
            <Pie
              data={topUnits}
              dataKey="bookings"
              nameKey="name"
              cx="70%"
              cy="50%"
              innerRadius={40}
              outerRadius={80} // Increased size for better visibility
              fill="#4F46E5"
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {topUnits.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FrequentUnitsCard;
