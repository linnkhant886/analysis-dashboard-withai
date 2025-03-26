"use client";

import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Printer } from "lucide-react";
import { useState } from "react";

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
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!contentRef.current) return;

    setIsExporting(true);
    try {
      // Capture the content using html2canvas
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // Helps with cross-origin images
        scrollX: 0,
        scrollY: -window.scrollY, // Ensure the entire content is captured, even if scrolled
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      // A4 dimensions in mm (210mm x 297mm)
      const a4WidthMm = 210;
      const a4HeightMm = 297;

      // Convert pixel dimensions to mm (assuming 96 DPI for html2canvas)
      const dpi = 96;
      const pxToMm = (px: number) => (px * 25.4) / dpi; // 25.4 mm per inch

      const imgWidthMm = pxToMm(imgWidthPx);
      const imgHeightMm = pxToMm(imgHeightPx);

      // Calculate the scaling factor to fit the content width within A4 width
      const scale = a4WidthMm / imgWidthMm;
      const scaledWidthMm = imgWidthMm * scale;
      const scaledHeightMm = imgHeightMm * scale;

      // Initialize the PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // If the scaled height fits within one A4 page
      if (scaledHeightMm <= a4HeightMm) {
        pdf.addImage(imgData, "PNG", 0, 0, scaledWidthMm, scaledHeightMm);
      } else {
        // If the content is too long, split it across multiple pages
        const pageHeightPx = (a4HeightMm / scale) * 2; // Convert A4 height back to pixels (accounting for scale=2)
        let positionY = 0;

        while (positionY < imgHeightPx) {
          // Create a temporary canvas for the current page
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgWidthPx;
          pageCanvas.height = Math.min(pageHeightPx, imgHeightPx - positionY);
          const ctx = pageCanvas.getContext("2d");

          if (ctx) {
            // Draw the portion of the original canvas onto the page canvas
            ctx.drawImage(
              canvas,
              0,
              positionY,
              imgWidthPx,
              pageCanvas.height,
              0,
              0,
              imgWidthPx,
              pageCanvas.height
            );

            const pageImgData = pageCanvas.toDataURL("image/png");
            pdf.addImage(pageImgData, "PNG", 0, 0, scaledWidthMm, a4HeightMm);

            positionY += pageHeightPx;

            // Add a new page if there's more content to render
            if (positionY < imgHeightPx) {
              pdf.addPage();
            }
          }
        }
      }

      // Save the PDF
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button onClick={exportToPDF} className={className} disabled={isExporting}>
      <Printer className="mr-2 h-4 w-4" />
      {isExporting ? "Exporting..." : buttonText}
    </Button>
  );
}