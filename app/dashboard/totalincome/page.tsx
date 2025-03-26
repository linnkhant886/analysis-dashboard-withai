"use client";

import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import dynamic from "next/dynamic";

const ExportPDFButton = dynamic(() => import("../../components/ExportPDFButton"), {
  ssr: false,
});


// Mock data - replace with actual data from your API
const currentMonthIncome = 15750;
const lastMonthIncome = 24250;
const currentYearIncome = 70000;
const lastYearIncome = 165000;

const monthlyData = [
  { name: "Jan", income: 30000 },
  { name: "Feb", income: 24250 },
  { name: "Mar", income: 15750 },
  { name: "Apr", income: 0 },
  { name: "May", income: 0 },
  { name: "Jun", income: 0 },
  { name: "Jul", income: 0 },
  { name: "Aug", income: 0 },
  { name: "Sep", income: 0 },
  { name: "Oct", income: 0 },
  { name: "Nov", income: 0 },
  { name: "Dec", income: 0 },
];

const yearlyData = [
  { year: "2020", income: 145000 },
  { year: "2021", income: 155000 },
  { year: "2022", income: 165000 },
  { year: "2023", income: 172000 },
  { year: "2024", income: 178500 },
];

export default function IncomeDashboard() {
  const monthlyChange =
    ((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
  const yearlyChange =
    ((currentYearIncome - lastYearIncome) / lastYearIncome) * 100;

  const incomeRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={incomeRef} className="p-8 bg-background min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold ">Total Income</h1>
        <ExportPDFButton
          contentRef={incomeRef}
          fileName="income_report"
          buttonText="Export File"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Income Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Month Income
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${currentMonthIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {monthlyChange > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {monthlyChange.toFixed(2)}% from last month
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    {Math.abs(monthlyChange).toFixed(2)}% from last month
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Yearly Income Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Year Income
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${currentYearIncome.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {yearlyChange > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {yearlyChange.toFixed(2)}% from last year
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    {Math.abs(yearlyChange).toFixed(2)}% from last year
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Income Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Monthly Income Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Yearly Income Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Yearly Income Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
