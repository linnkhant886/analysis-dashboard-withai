'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CustomerBarChart } from "./CustomerBarChart";

const CanceledBookingsCard = () => {
  // Placeholder data for March 2025
  const totalBookings = 1079; // Total bookings in March
  const canceledBookings = 30; // Canceled bookings in March
  const canceledPercentage = ((canceledBookings / totalBookings) * 100).toFixed(
    1
  );

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Canceled Bookings (March 2025)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 ">
          <p className="text-sm  ml-8  text-muted-foreground">
            Canceled This Month : {canceledBookings}
          </p>
          <CustomerBarChart />

          <p className="text-xs text-red-600 ml-8">
            {canceledPercentage} % of total bookings
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CanceledBookingsCard;
