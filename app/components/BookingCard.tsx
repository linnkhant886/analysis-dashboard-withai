import React from 'react';

// Example icons (replace with your preferred icon library, e.g., react-icons)
const ArrivalIcon = () => (
  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const DepartureIcon = () => (
  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

const BookingCard = () => {
  // Placeholder data for March 08, 2025
  const arrivals = 15; // Replace with your actual data
  const departures = 8; // Replace with your actual data

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Today Bookings (March 08, 2025)</h3>
        <div className="flex justify-between gap-4">
          {/* Arrivals Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Arrivals</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{arrivals}</h3>
                <p className="mt-1 text-xs text-emerald-500">+2 from yesterday</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                <ArrivalIcon />
              </div>
            </div>
          </div>
          {/* Divider */}
          <div className="w-px bg-gray-200" />
          {/* Departures Section */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Departures</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{departures}</h3>
                <p className="mt-1 text-xs text-emerald-500">-1 from yesterday</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500">
                <DepartureIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;