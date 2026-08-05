import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

import Bookings from "@/pages/Bookings";
import { getMyBookings } from "@/api/bookingApi";
import { setCurrentBooking } from "@/redux/slices/bookingSlice";
import LogoLoader from "@/components/common/LogoLoader";

const Cart = () => {
  const dispatch = useDispatch();
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const user = useSelector((state) => state.auth.user);

  // Initialize loading to true ONLY if we don't already have currentBooking in Redux
  const [loading, setLoading] = useState(!currentBooking);

  useEffect(() => {
    const userId = user?.userId || user?.id;

    // IF Redux already has an active booking, DO NOT set loading or call API
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

  // 1. Show Loading Spinner ONLY during initial background fetch when Redux is empty
  if (loading && !currentBooking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LogoLoader />
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

  // 4. Render Enhanced Empty State if no active booking exists
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center w-full px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xs p-10 text-center space-y-6">
        
        {/* Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8" strokeWidth={1.75} />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            No Active Bookings
          </h1>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            You don't have any pending requests or payments at the moment. Explore our catalog to find gear for your next project.
          </p>
        </div>

        {/* Action Button */}
        <Link
          to="/browserdevices"
          className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
        >
          <span>Browse Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>
    </div>
  );
};

export default Cart;