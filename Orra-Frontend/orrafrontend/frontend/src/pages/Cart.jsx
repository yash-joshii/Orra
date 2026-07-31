import React from 'react';
import { useSelector } from 'react-redux';
import Bookings from '@/pages/Bookings'; // Adjust import path if needed

const Cart = () => {
  const currentBooking = useSelector((state) => state.booking.currentBooking);

  // Check if a booking exists and is pending or accepted (unpaid)
  const hasPendingBooking =
    currentBooking &&
    (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED");

  // 1. If there is a pending booking, show the Review & Bookings page
  if (hasPendingBooking) {
    return <Bookings />;
  }

  // 2. Otherwise, show the big centered empty state
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center tracking-tight">
        No Recent Pending Booking
      </h1>
    </div>
  );
};

export default Cart;