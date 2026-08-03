import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bookings from "@/pages/Bookings";
import { getMyBookings } from "@/api/bookingApi";
import { setCurrentBooking } from "@/redux/slices/bookingSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  // Fetch active bookings on mount if missing from Redux state
  useEffect(() => {
    const userId = user?.userId || user?.id;

    if (userId && !currentBooking) {
      setLoading(true);
      getMyBookings(userId)
        .then((res) => {
          const bookings = res.data || [];
          // Find active booking (ACCEPTED or PENDING)
          const active = bookings.find(
            (b) => b.status === "ACCEPTED" || b.status === "PENDING"
          );
          if (active) {
            dispatch(setCurrentBooking(active));
          }
        })
        .catch((err) => console.error("Error loading active booking for cart:", err))
        .finally(() => setLoading(false));
    }
  }, [user, currentBooking, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-medium">Loading booking review...</p>
      </div>
    );
  }

  // 1. Render Request to Book screen when an active booking exists
  const hasActiveBooking =
    currentBooking &&
    (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED");

  if (hasActiveBooking) {
    return <Bookings bookingData={currentBooking} />;
  }

  // 2. Render Empty State ONLY when no active booking exists
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] w-full px-4">
      <div className="bg-slate-100 p-6 rounded-full mb-4">
        <svg
          className="w-12 h-12 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center tracking-tight">
        No Active Bookings
      </h1>

      <p className="mt-2 text-base text-slate-500 text-center max-w-md">
        You don't have any pending requests or payments at the moment.
      </p>
    </div>
  );
};

export default Cart;