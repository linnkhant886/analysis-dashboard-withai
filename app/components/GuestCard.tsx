'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Adjust path based on your setup
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"; // Lucide icons for arrivals/departures
import { Separator } from "@/components/ui/separator";

const GuestCard = () => {
  // Placeholder data for March 08, 2025
  const arrivals = 15; // Replace with your actual data
  const departures = 8; // Replace with your actual data

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Today’s Bookings (March 08, 2025)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-6">
          {/* Arrivals Section */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Arrivals</p>
                <h3 className="text-2xl font-bold">{arrivals}</h3>
                <p className="text-xs text-emerald-600">+2 from yesterday</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                <ArrowUpIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          {/* Divider */}
          <Separator orientation="vertical" className="h-34" />
          {/* Departures Section */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Departures</p>
                <h3 className="text-2xl font-bold">{departures}</h3>
                <p className="text-xs text-emerald-600">-1 from yesterday</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
                <ArrowDownIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestCard;
