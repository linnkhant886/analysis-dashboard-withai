"use client";

import BookedCard from "../components/charts/BookedCard";
import GuestCard from "../components/GuestCard";
import CanceledBookingsCard from "../components/charts/CancelBookingCard";
import FrequentUnitsCard from "../components/FrequentUnitsCard";
import { useRef } from "react";

import dynamic from "next/dynamic";

const ExportPDFButton = dynamic(() => import("../components/ExportPDFButton"), {
  ssr: false,
});

export default function Home() {
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="flex justify-end mr-6">
        <ExportPDFButton
          contentRef={dashboardRef}
          fileName="dashboard_report"
          buttonText="Export File"
          className="mt-4"
        />
      </div>
      <main ref={dashboardRef} className="flex-1 bg-muted/20 p-6">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <BookedCard />
            </div>
            <div>
              <GuestCard />
            </div>
            <div>
              <CanceledBookingsCard />
            </div>
            <div>
              <FrequentUnitsCard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
