"use client";

import { ChartLine, Home, List, LogOut, Package, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication token from localStorages
    document.cookie = "authToken=; Max-Age=0; path=/";
    // Redirect to the login page
    router.push("/");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sticky top-0 hidden md:block h-screen w-[250px] bg-gray-800 text-white transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">MidNight</h2>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-4rem-4rem)]">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <Home className="h-4 w-4" />
                <span>Booking Detail</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/birthdays"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <List className="h-4 w-4" />
                <span>Guests Birthday</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/totalincome"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <Package className="h-4 w-4" />
                <span>Total Income</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/agegroup"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <User className="h-4 w-4" />
                <span>Guest By AgeGroup</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <ChartLine className="h-4 w-4" />
                <span>Booking-Analysis</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex  items-center w-[150px] gap-5 text-sm bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            <LogOut className="h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
