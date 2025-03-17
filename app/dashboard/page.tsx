"use client";
import BookedCard from "../components/charts/BookedCard";
import GuestCard from "../components/GuestCard";
import CanceledBookingsCard from "../components/charts/CancelBookingCard";
import FrequentUnitsCard from "../components/FrequentUnitsCard";


export default function Home() {

  return (
    <div>
      <main className="flex-1 bg-muted/20 p-6">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2   ">
            <BookedCard />
            <GuestCard />
            <CanceledBookingsCard />
            <FrequentUnitsCard />
          </div>
        </div>
      </main>
      
    </div>
  );
}
