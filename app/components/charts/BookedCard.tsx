"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const BookedCard = () => {
  // Placeholder data for March 08, 2025
  const currentMonthArrivals = 178; // Arrivals in March 2025
  const totalMonthBookings = 200; // Total bookings for March 2025
  const currentYearArrivals = 300; // Arrivals in 2025
  const totalYearBookings = 1000; // Total bookings for 2025

  // Calculate percentages
  const monthPercentage = (
    (currentMonthArrivals / totalMonthBookings) *
    100
  ).toFixed(1);
  const yearPercentage = (
    (currentYearArrivals / totalYearBookings) *
    100
  ).toFixed(1);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Booking Arrivals (March 08, 2025)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-6">
          {/* Current Month Section */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  This Month (March)
                </p>
                <h3 className="text-2xl font-bold">{currentMonthArrivals}</h3>
                <p className="text-xs text-emerald-600">
                  {monthPercentage}% of {totalMonthBookings} bookings
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                <ArrowUpIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          {/* Divider */}
          <Separator orientation="vertical" className="h-34" />
          {/* Current Year Section */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  This Year (2025)
                </p>
                <h3 className="text-2xl font-bold">{currentYearArrivals}</h3>
                <p className="text-xs text-emerald-600">
                  {yearPercentage}% of {totalYearBookings} bookings
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-white">
                <ArrowUpIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookedCard;
