import React from "react";
import { useSelector } from "react-redux";
import Bookings from "@/pages/Bookings"; // Adjust the import if needed

const Cart = () => {
  // Get the current booking from Redux
  const currentBooking = useSelector((state) => state.booking.currentBooking);

  // Show the booking page only when payment is pending
  const hasPendingPayment =
    currentBooking?.status === "ACCEPTED";

  // If there is an accepted booking awaiting payment
  if (hasPendingPayment) {
    return <Bookings />;
  }

  // Otherwise show the empty state
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center tracking-tight">
        No Pending Payments
      </h1>

      <p className="mt-4 text-lg text-gray-500 text-center max-w-md">
        You don't have any bookings awaiting payment at the moment.
      </p>
    </div>
  );
};

export default Cart;