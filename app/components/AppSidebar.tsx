"use client";

import { Home, List, Package, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`sticky top-0 h-screen w-[250px] bg-gray-800 text-white transition-all duration-300`}
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
                href="/"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <Home className="h-4 w-4" />
                <span>Booking Detail</span>
              </Link>
            </li>
            <li>
              <a
                href="/birthdays"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <List className="h-4 w-4" />
                <span>Guests Birthday</span>
              </a>
            </li>
            <li>
              <a
                href="/totalincome"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <Package className="h-4 w-4" />
                <span>Total Income</span>
              </a>
            </li>
            <li>
              <a
                href="/agegroup"
                className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded"
              >
                <User className="h-4 w-4" />
                <span>Guest By AgeGroup</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <p className="text-sm">© 2025 MidNight</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
