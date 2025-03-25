"use client";

import BookedCard from "../components/charts/BookedCard";
import GuestCard from "../components/GuestCard";
import CanceledBookingsCard from "../components/charts/CancelBookingCard";
import FrequentUnitsCard from "../components/FrequentUnitsCard";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Home() {
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  const exportToPDF = async () => {
    if (!dashboardRef.current) return;

    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2, // Higher quality
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("dashboard_report.pdf");
  };

  return (
    <div>
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

          <div className="">
          <Button onClick={exportToPDF}>Export as PDF</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
