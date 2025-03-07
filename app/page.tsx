"use client";
import { useState } from "react";
import Chat from "./components/chat";
import { FaRobot, FaMinus } from "react-icons/fa";
import { MetricCard } from "./components/MetricCard";
import { ChevronDown, Package, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonutChart } from "./components/DonutChart";
import { LineChartComponent } from "./components/LineChart";
import { Badge } from "@/components/ui/badge";
import { RevenueChart } from "./components/Revenue-chart";
import { Button } from "@/components/ui/button";
import { CustomerBarChart } from "./components/CustomerBarChart";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <main className="flex-1 bg-muted/20 p-6">
        <div className="space-y-6">
          {/* <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Hi, Samantha. Welcome back to Sedap Admin!
            </p>
          </div> */}
          {/* <Separator /> */}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Orders"
              value="75"
              trend="+15 (20%)"
              icon={<ShoppingBag className="h-5 w-5 text-emerald-500" />}
              iconBg="bg-emerald-100"
            />
            <MetricCard
              title="Total Delivered"
              value="357"
              trend="+20 (5.9%)"
              icon={<Package className="h-5 w-5 text-emerald-500" />}
              iconBg="bg-emerald-100"
            />
            <MetricCard
              title="Total Cancelled"
              value="65"
              trend="+10 (15.4%)"
              icon={<Package className="h-5 w-5 text-rose-500" />}
              iconBg="bg-rose-100"
            />
            <MetricCard
              title="Total Revenue"
              value="$128"
              trend="+$15 (13.2%)"
              icon={<ShoppingBag className="h-5 w-5 text-emerald-500" />}
              iconBg="bg-emerald-100"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">
                  Pie Chart
                </CardTitle>
                <Tabs defaultValue="chart">
                  <TabsList className="grid w-[160px] grid-cols-2">
                    <TabsTrigger value="chart">Chart</TabsTrigger>
                    <TabsTrigger value="value">Show Value</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <DonutChart title="Total Order" value="81%" color="#FF6B6B" />
                  <DonutChart
                    title="Customer Growth"
                    value="22%"
                    color="#2ECC71"
                  />
                  <DonutChart
                    title="Total Revenue"
                    value="62%"
                    color="#3498DB"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Chart Order
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adip
                </p>
              </CardHeader>
              <CardContent>
                <LineChartComponent />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">
                  Total Revenue
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 rounded-full"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>2020</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 rounded-full"
                  >
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    <span>2021</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">
                  Customer Map
                </CardTitle>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  Weekly
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent>
                <CustomerBarChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <div className="  fixed bottom-4 right-4 flex flex-col items-end">
        <div
          className={`transition-all duration-300 transform  ${
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          {isOpen && (
            <div className="relative">
              <Chat />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-2 bg-[#3C096C] text-white p-2 rounded-full hover:bg-[#924dce] transition"
              >
                <FaMinus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex  items-center space-x-2 bg-blue-500 text-white px-4 py-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            <FaRobot className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
