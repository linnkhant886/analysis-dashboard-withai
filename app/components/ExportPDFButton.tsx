"use client";

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Printer } from "lucide-react"; 

interface ExportPDFButtonProps {
  contentRef: React.RefObject<HTMLElement | HTMLDivElement | null>;
  fileName?: string;
  buttonText?: string;
  className?: string;
}

export default function ExportPDFButton({
  contentRef,
  fileName = "report",
  buttonText = "Export as PDF",
  className,
}: ExportPDFButtonProps) {
  const exportToPDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // Helps with cross-origin images if any
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
  };

  return (
    <Button onClick={exportToPDF} className={className}>
      <Printer className="mr-2 h-4 w-4" /> {/* Optional icon */}
      {buttonText}
    </Button>
  );
}