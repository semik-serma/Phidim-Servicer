'use client';

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await fetch("http://localhost:8000/bookings/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data)
        setBookings(data);
      } catch (err) {
        console.error("Failed to get bookings:", err);
        setError("Failed to load bookings");
        toast.error('Failed to load bookings')
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Bookings</h1>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-12 text-center text-sm text-gray-500">
          Loading bookings...
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && bookings.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg">
          No bookings available.
        </div>
      )}

      {/* Bookings List */}
      {!loading && !error && bookings.length > 0 && (
        <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
            >
              {/* Customer */}
              <div className="flex flex-col">
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Customer
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {booking.customer?.first_name} {booking.customer?.last_name}
                </span>
              </div>

              {/* Arrow Indicator */}
              <span className="text-gray-400 px-4 select-none">→</span>

              {/* Technician */}
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Technician
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {booking.technician?.first_name} {booking.technician?.last_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}