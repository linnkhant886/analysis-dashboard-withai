"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";

// Mock data - replace with actual data from your API
const currentMonth = new Date();
const daysInMonth = eachDayOfInterval({
  start: startOfMonth(currentMonth),
  end: endOfMonth(currentMonth),
}).map((date) => format(date, "MMM dd"));

// Generate mock data for the current month
const generateMockData = () => {
  return daysInMonth.map((day) => {
    const memberBookings = Math.floor(Math.random() * 15) + 5;
    const generalBookings = Math.floor(Math.random() * 20) + 10;
    const totalRooms = 100;
    const occupiedRooms = Math.floor(Math.random() * 80) + 20;
    const revenue = occupiedRooms * (Math.floor(Math.random() * 100) + 150);

    return {
      date: day,
      memberBookings,
      generalBookings,
      totalBookings: memberBookings + generalBookings,
      occupancyRate: (occupiedRooms / totalRooms) * 100,
      adr: revenue / occupiedRooms,
      revenue,
    };
  });
};

const bookingData = generateMockData();

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const monthlyStats = calculateMonthlyStats();

const paymentMethodData = [
  {
    name: "Credit Card",
    value: 45,
    color: "#8884d8",
    trend: "+5.2%",
    status: "up",
  },
  { name: "PayPal", value: 25, color: "#82ca9d", trend: "+2.8%", status: "up" },
  {
    name: "Bank Transfer",
    value: 15,
    color: "#ffc658",
    trend: "-1.5%",
    status: "down",
  },
  {
    name: "Apple Pay",
    value: 8,
    color: "#ff8042",
    trend: "+12.3%",
    status: "up",
  },
  {
    name: "Google Pay",
    value: 5,
    color: "#0088FE",
    trend: "+8.7%",
    status: "up",
  },
  { name: "Cash", value: 2, color: "#00C49F", trend: "-3.2%", status: "down" },
];



export default function Payment() {
  const [paymentView, setPaymentView] = useState("chart");

  // State to manage chart/table view

  return (
    <div className="p-6 bg-background">
      {/* Payment Method Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>
                  Breakdown of booking payments by method
                </CardDescription>
              </div>
              <Tabs
                value={paymentView}
                onValueChange={setPaymentView}
                className="w-[200px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="table">Table</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentView} className="mt-0">
                <TabsContent value="chart" className="mt-0">
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {paymentMethodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                <TabsContent value="table" className="mt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment Method</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                        <TableHead className="text-right">Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentMethodData.map((method) => (
                        <TableRow key={method.name}>
                          <TableCell className="font-medium">
                            {method.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {method.value}%
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`flex items-center justify-end ${
                                method.status === "up"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {method.trend}
                              {method.status === "up" ? (
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                              ) : (
                                <ArrowDownRight className="ml-1 h-4 w-4" />
                              )}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <div className="flex items-center">
                <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                Credit Card and digital payments are growing, while cash and
                bank transfers are declining
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Payment Method Stats</CardTitle>
              <CardDescription>Key metrics and trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-1">Most Used Method</div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#8884d8]/20 flex items-center justify-center mr-3">
                    <CreditCard className="h-6 w-6 text-[#8884d8]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">Credit Card</div>
                    <div className="text-sm text-muted-foreground">
                      45% of all transactions
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Fastest Growing</div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#ff8042]/20 flex items-center justify-center mr-3">
                    <DollarSign className="h-6 w-6 text-[#ff8042]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">Apple Pay</div>
                    <div className="text-sm text-muted-foreground">
                      +12.3% month over month
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">
                  Average Transaction Value
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Highest</div>
                    <div className="text-lg font-bold">$780</div>
                    <div className="text-xs">Bank Transfer</div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Lowest</div>
                    <div className="text-lg font-bold">$225</div>
                    <div className="text-xs">Cash</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
