import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bookings from "@/pages/Bookings";
import { getMyBookings } from "@/api/bookingApi";
import { setCurrentBooking } from "@/redux/slices/bookingSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const user = useSelector((state) => state.auth.user);

  // Initialize loading to true ONLY if we don't already have currentBooking in Redux
  const [loading, setLoading] = useState(!currentBooking);

  useEffect(() => {
    const userId = user?.userId || user?.id;

    // 💡 IF Redux already has an active booking, DO NOT set loading or call API
    if (userId && !currentBooking) {
      setLoading(true);
      getMyBookings(userId)
        .then((res) => {
          const bookings = res.data || [];
          const active = bookings.find(
            (b) => b.status === "PENDING" || b.status === "ACCEPTED"
          );

          if (active) {
            dispatch(setCurrentBooking(active));
          } else {
            dispatch(setCurrentBooking(null));
          }
        })
        .catch((err) => {
          console.error("Error loading active booking for cart:", err);
          dispatch(setCurrentBooking(null));
        })
        .finally(() => setLoading(false));
    } else {
      // If currentBooking exists, ensure loading is false
      setLoading(false);
    }
  }, [user, currentBooking, dispatch]);

  // 1. Show Loading Spinner ONLY during the initial background fetch when Redux is empty
  if (loading && !currentBooking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-2">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-medium">Checking booking status...</p>
      </div>
    );
  }

  // 2. Check if status is STRICTLY "PENDING" or "ACCEPTED"
  const isPendingOrAccepted =
    currentBooking &&
    (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED");

  // 3. Instant Render: Show Request to Book screen if active booking exists in Redux
  if (isPendingOrAccepted) {
    return <Bookings bookingData={currentBooking} />;
  }

  // 4. Render Empty State if no active booking exists
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