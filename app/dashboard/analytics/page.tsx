"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import dynamic from "next/dynamic";
import Payment from "./payment";

const ExportPDFButton = dynamic(
  () => import("../../components/ExportPDFButton"),
  {
    ssr: false,
  }
);

// Fixed total bookings for the month
const FIXED_TOTAL_BOOKINGS = 1079;

// Fixed averages for the month
const FIXED_AVG_OCCUPANCY_RATE = 90; // 75% average occupancy rate
const FIXED_AVG_ADR = 200; // $200 average daily rate
const TOTAL_ROOMS = 100; // Total rooms in the hotel

// Current month and days
const currentMonth = new Date();
const daysInMonth = eachDayOfInterval({
  start: startOfMonth(currentMonth),
  end: endOfMonth(currentMonth),
}).map((date) => format(date, "MMM dd"));
const numDays = daysInMonth.length;

// Generate fixed data for the current month
const generateMockData = () => {
  // Step 1: Calculate the original percentage split for member vs. general bookings
  const originalData = daysInMonth.map(() => {
    const memberBookings = Math.floor(Math.random() * 15) + 5;
    const generalBookings = Math.floor(Math.random() * 20) + 10;
    return { memberBookings, generalBookings };
  });

  const totalMemberBookingsOriginal = originalData.reduce(
    (sum, day) => sum + day.memberBookings,
    0
  );
  const totalGeneralBookingsOriginal = originalData.reduce(
    (sum, day) => sum + day.generalBookings,
    0
  );
  const totalBookingsOriginal =
    totalMemberBookingsOriginal + totalGeneralBookingsOriginal;

  const memberPercentage =
    (totalMemberBookingsOriginal / totalBookingsOriginal) * 100;
  

  // Step 2: Scale member and general bookings to fit the fixed total of 1079
  const totalMemberBookings = Math.round(
    (memberPercentage / 100) * FIXED_TOTAL_BOOKINGS
  );
  const totalGeneralBookings = FIXED_TOTAL_BOOKINGS - totalMemberBookings;

  // Step 3: Distribute bookings across days, with a slight variation (e.g., higher on weekends)
  const dailyBookings = daysInMonth.map((_, index) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Saturday or Sunday
    const weight = isWeekend ? 1.2 : 0.8; // 20% more bookings on weekends, 20% less on weekdays
    return weight;
  });

  const totalWeight = dailyBookings.reduce((sum, weight) => sum + weight, 0);
  const memberBookingsPerDay = dailyBookings.map((weight) =>
    Math.round((weight / totalWeight) * totalMemberBookings)
  );
  const generalBookingsPerDay = dailyBookings.map((weight) =>
    Math.round((weight / totalWeight) * totalGeneralBookings)
  );

  // Adjust the last day to ensure the total matches exactly 1079
  const currentMemberTotal = memberBookingsPerDay.reduce((sum, val) => sum + val, 0);
  const currentGeneralTotal = generalBookingsPerDay.reduce((sum, val) => sum + val, 0);
  memberBookingsPerDay[numDays - 1] += totalMemberBookings - currentMemberTotal;
  generalBookingsPerDay[numDays - 1] += totalGeneralBookings - currentGeneralTotal;

  // Step 4: Generate daily data with fixed averages for occupancy rate and ADR
  return daysInMonth.map((day, index) => {
    const memberBookings = memberBookingsPerDay[index];
    const generalBookings = generalBookingsPerDay[index];
    const totalBookings = memberBookings + generalBookings;

    // Occupancy rate: Vary slightly around the fixed average (75%)
    const occupancyVariation = (Math.random() * 10 - 5); // Vary by ±5%
    const occupancyRate = Math.min(100, Math.max(0, FIXED_AVG_OCCUPANCY_RATE + occupancyVariation));
    const occupiedRooms = Math.round((occupancyRate / 100) * TOTAL_ROOMS)

    // ADR: Vary slightly around the fixed average ($200)
    const adrVariation = (Math.random() * 20 - 10); // Vary by ±$10
    const adr = Math.max(50, FIXED_AVG_ADR + adrVariation); // Ensure ADR is reasonable

    // Revenue: Calculate based on occupied rooms and ADR
    const revenue = occupiedRooms * adr;

    return {
      date: day,
      memberBookings,
      generalBookings,
      totalBookings,
      occupancyRate,
      adr,
      revenue,
    };
  });
};

const bookingData = generateMockData();

// Calculate monthly averages and totals
const calculateMonthlyStats = () => {
  const totalMemberBookings = bookingData.reduce(
    (sum, day) => sum + day.memberBookings,
    0
  );
  const totalGeneralBookings = bookingData.reduce(
    (sum, day) => sum + day.generalBookings,
    0
  );
  const totalBookings = totalMemberBookings + totalGeneralBookings;

  const avgOccupancyRate =
    bookingData.reduce((sum, day) => sum + day.occupancyRate, 0) /
    bookingData.length;
  const avgADR =
    bookingData.reduce((sum, day) => sum + day.adr, 0) / bookingData.length;
  const totalRevenue = bookingData.reduce((sum, day) => sum + day.revenue, 0);

  return {
    totalMemberBookings,
    totalGeneralBookings,
    totalBookings,
    memberPercentage: (totalMemberBookings / totalBookings) * 100,
    generalPercentage: (totalGeneralBookings / totalBookings) * 100,
    avgOccupancyRate,
    avgADR,
    totalRevenue,
  };
};

const monthlyStats = calculateMonthlyStats();

export default function BookingAnalytics() {
  const [, setActiveTab] = useState("overview");
  const analysisRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={analysisRef} className="p-6 bg-background">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">
          Booking Analysis - {format(currentMonth, "MMMM yyyy")}
        </h1>
        <ExportPDFButton
          contentRef={analysisRef}
          fileName="booking_analysis_report"
          buttonText="Export File"
          className="mt-4"
        />
      </div>
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings Comparison</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy & ADR</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {monthlyStats.totalBookings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For {format(currentMonth, "MMMM yyyy")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Member Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {monthlyStats.totalMemberBookings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {monthlyStats.memberPercentage.toFixed(1)}% of total
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Occupancy Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {monthlyStats.avgOccupancyRate.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Room occupancy this month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Daily Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${monthlyStats.avgADR.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Per occupied room
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Combined Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>
                  Bookings, Occupancy Rate, and ADR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="memberBookings"
                      name="Member Bookings"
                      fill="#8884d8"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="generalBookings"
                      name="General Bookings"
                      fill="#82ca9d"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="occupancyRate"
                      name="Occupancy Rate (%)"
                      stroke="#ff7300"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="adr"
                      name="ADR ($)"
                      stroke="#ff0000"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          {/* Member vs General Bookings Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Booking Distribution</CardTitle>
                  <CardDescription>
                    Member vs General Guest Bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChartComponent
                        data={[
                          {
                            name: "Member Bookings",
                            value: monthlyStats.totalMemberBookings,
                          },
                          {
                            name: "General Bookings",
                            value: monthlyStats.totalGeneralBookings,
                          },
                        ]}
                      />
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Daily Booking Comparison</CardTitle>
                  <CardDescription>
                    Member vs General Guest Arrivals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="memberBookings"
                        name="Member Bookings"
                        fill="#8884d8"
                      />
                      <Bar
                        dataKey="generalBookings"
                        name="General Bookings"
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>
                  Daily booking patterns for the month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="memberBookings"
                      name="Member Bookings"
                      stroke="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="generalBookings"
                      name="General Bookings"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalBookings"
                      name="Total Bookings"
                      stroke="#ff7300"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-6">
          {/* Occupancy Rate and ADR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Rate</CardTitle>
                  <CardDescription>Daily occupancy percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="occupancyRate"
                        name="Occupancy Rate (%)"
                        fill="#8884d8"
                        stroke="#8884d8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Average Daily Rate (ADR)</CardTitle>
                  <CardDescription>Daily ADR in dollars</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="adr"
                        name="ADR ($)"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Occupancy & Revenue Correlation</CardTitle>
                <CardDescription>
                  Relationship between occupancy and daily revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="occupancyRate"
                      name="Occupancy Rate (%)"
                      fill="#8884d8"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue ($)"
                      stroke="#ff7300"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6"> 

         <Payment />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// PieChart Component
function PieChartComponent({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}