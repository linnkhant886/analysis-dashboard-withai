"use client";
import { useState } from "react";
import Chat from "./components/chat";
import { FaRobot, FaMinus } from "react-icons/fa";

import BookedCard from "./components/BookedCard";
import GuestCard from "./components/GuestCard";
import CanceledBookingsCard from "./components/CancelBookingCard";
import FrequentUnitsCard from "./components/FrequentUnitsCard";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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
