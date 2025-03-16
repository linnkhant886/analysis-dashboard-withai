"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { format, isSameMonth, isSameWeek } from "date-fns";

// Mock data - replace with actual data from your API
const guestBirthdays = [
  {
    id: 1,
    name: "Alice Johnson",
    birthday: new Date(1990, 6, 15),
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    birthday: new Date(1985, 6, 22),
    email: "bob@example.com",
  },
  {
    id: 3,
    name: "Charlie Brown",
    birthday: new Date(1992, 6, 5),
    email: "charlie@example.com",
  },
  {
    id: 4,
    name: "Diana Prince",
    birthday: new Date(1988, 6, 18),
    email: "diana@example.com",
  },
  {
    id: 5,
    name: "Edward Cullen",
    birthday: new Date(1995, 6, 30),
    email: "edward@example.com",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    birthday: new Date(1991, 7, 2),
    email: "fiona@example.com",
  },
  {
    id: 7,
    name: "Richard",
    birthday: new Date(2000, 3, 15),
    email: "Richard@example.com",
  },
  // Add more guests as needed
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#82CA9D",
];

export default function GuestBirthdays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("monthly");

  const filteredBirthdays = guestBirthdays.filter((guest) => {
    if (!selectedDate) return false;
    const guestBirthday = new Date(
      selectedDate.getFullYear(),
      guest.birthday.getMonth(),
      guest.birthday.getDate()
    );
    if (viewMode === "weekly") {
      return isSameWeek(guestBirthday, selectedDate);
    } else {
      return isSameMonth(guestBirthday, selectedDate);
    }
  });

  const birthdaysByDate = filteredBirthdays.reduce((acc, guest) => {
    const date = format(
      new Date(
        selectedDate!.getFullYear(),
        guest.birthday.getMonth(),
        guest.birthday.getDate()
      ),
      "MMM d"
    );
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(birthdaysByDate).map(([date, count]) => ({
    name: date,
    value: count,
  }));
  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Guest Birthdays</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Birthday View Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Select
                  value={viewMode}
                  onValueChange={(value: "weekly" | "monthly") =>
                    setViewMode(value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setSelectedDate(new Date())}>
                  Reset to Today
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Birthday Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Birthday Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Birthday List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {viewMode === "weekly" ? "This Week's" : "This Month's"}{" "}
                Birthdays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Birthday</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBirthdays.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell>{guest.name}</TableCell>
                      <TableCell>
                        {format(
                          new Date(
                            selectedDate!.getFullYear(),
                            guest.birthday.getMonth(),
                            guest.birthday.getDate()
                          ),
                          "MMMM d"
                        )}
                      </TableCell>
                      <TableCell>{guest.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
