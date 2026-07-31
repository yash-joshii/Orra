import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { toast } from "sonner";

// Shadcn Imports
import { TooltipProvider } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// Redux Imports & API Actions
import { getProductById } from "@/api/listingApi";
import {
  cancelBooking,
  createBooking,
  getBookingById,
} from "@/api/bookingApi";
import {
  setLoading as setBookingLoading,
  setCurrentBooking,
  setError as setBookingError,
} from "@/redux/slices/bookingSlice";
import {
  setSelectedProducts,
  setLoading,
  setError,
} from "@/redux/slices/productslices";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { createOrder } from "@/api/paymentapi";

// Sub-components
import BookingBreadcrumb from "../components/booking/BookingBreadcrumb";
import ProductSummaryCard from "../components/booking/ProductSummaryCard";
import RentalDatePicker from "../components/booking/RentalDatePicker";
import PriceSummary from "../components/booking/PriceSummary";
import BookingActionButtons from "../components/booking/BookingActionButtons";
import TrustBadges from "../components/booking/TrustBadges";

const Bookings = () => {
  const { Razorpay } = useRazorpay();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Component states
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // Redux Selectors
  const product = useSelector((state) => state.products.selectedProduct);
  const user = useSelector((state) => state.auth.user);
  const currentBooking = useSelector((state) => state.booking.currentBooking);

  // Fetch product if an ID is present in the URL
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getProductById(id);
      dispatch(setSelectedProducts(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

  // Handler: Request Booking
  const handleRequestBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      const payload = {
        listingId: product?.productId,
        renterId: user?.userId,
        startDateTime: startDate,
        endDateTime: endDate,
      };
      const response = await createBooking(payload);
      dispatch(setCurrentBooking(response.data));
      toast.success("Booking requested successfully!");
    } catch (err) {
      dispatch(setBookingError(err.message));
      toast.error(err.message || "Failed to create booking.");
    } finally {
      dispatch(setBookingLoading(false));
    }
  };

  // Handler: Razorpay Payment
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const handlePayForBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      // 1. Create payment order
      const orderResponse = await createOrder(
        grandTotal,
        currentBooking.bookingId
      );
      const order = orderResponse.data;

      // 2. Open Razorpay modal
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount * 100,
        currency: order.currency,
        name: "Orra Booking",
        description: "Booking Payment",
        order_id: order.razorpayOrderId,
        handler: function (response) {
          toast.success("Payment received! Confirming your booking...");
          dispatch(setBookingLoading(false));

          // Reset current booking state after successful payment -> triggers redirect to Cart page
          dispatch(setCurrentBooking(null));
        },
        modal: {
          ondismiss: function () {
            dispatch(setBookingLoading(false));
            toast.error("Payment cancelled.");
          },
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      dispatch(setBookingError(err.message));
      toast.error("Could not start payment. Please try again.");
      dispatch(setBookingLoading(false));
    }
  };

  // Handler: Cancel Booking
  const handleCancelBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      await cancelBooking(currentBooking.bookingId, user.userId);
      dispatch(setCurrentBooking(null));
      toast.success("Booking cancelled.");
    } catch (err) {
      dispatch(setBookingError(err.message));
    } finally {
      dispatch(setBookingLoading(false));
    }
  };

  // Polling for booking status changes
  useEffect(() => {
    if (!currentBooking) return;
    if (
      currentBooking.status !== "PENDING" &&
      currentBooking.status !== "ACCEPTED"
    )
      return;

    const intervalId = setInterval(async () => {
      try {
        const response = await getBookingById(currentBooking.bookingId);
        dispatch(setCurrentBooking(response.data));
      } catch (error) {
        console.error("Polling error:", error);
        toast.error("This booking request was declined by the owner.");
        dispatch(setCurrentBooking(null));
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentBooking?.bookingId, currentBooking?.status]);

  // Pricing calculations
  const rentalDays =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;
  const totalRent = product ? rentalDays * product?.dailyRate : 0;
  const platformFee = totalRent * 0.1;
  const estimatedTax = totalRent * 0.08;
  const grandTotal =
    totalRent + platformFee + estimatedTax + (product?.securityDeposit || 0);

  // Check if an active/pending booking exists
  const isBookingPendingPayment =
    currentBooking &&
    (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED");

  // If there is no active pending booking, redirect automatically to the cart page
  if (!isBookingPendingPayment) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="parent max-w-[1280px] mx-auto px-6 py-8 space-y-8">
      <BookingBreadcrumb />

      <div className="heading-detail text-2xl">
        <h1 className="text-4xl font-bold">Review Your Booking</h1>
        <span className="text-[17px] text-gray-500">
          Confirm the dates and details below to proceed.
        </span>
      </div>

      <hr className="border-t border-slate-200 my-6" />

      <TooltipProvider>
        <div className="booking-detail flex flex-row items-start justify-center gap-8 p-12 bg-slate-50/50 rounded-3xl min-h-[600px]">
          {/* Left Side: Product & Rental Details */}
          <div className="product-detail w-[660px] bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col gap-6">
            <ProductSummaryCard product={product} />

            <Separator className="bg-slate-100" />

            <RentalDatePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startOpen={startOpen}
              setStartOpen={setStartOpen}
              endOpen={endOpen}
              setEndOpen={setEndOpen}
              rentalDays={rentalDays}
            />

            {/* Message Box */}
            <div className="message-input space-y-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                💬 Message to Owner{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <Textarea
                className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50/30 placeholder:text-slate-400 p-4 resize-none focus-visible:ring-indigo-500"
                placeholder="Hello! I'd like to rent this gear for a weekend project..."
              />
            </div>
          </div>

          {/* Right Side: Pricing Details */}
          <div className="pricing w-[380px] bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col gap-5">
            <PriceSummary
              product={product}
              rentalDays={rentalDays}
              totalRent={totalRent}
              platformFee={platformFee}
              estimatedTax={estimatedTax}
              grandTotal={grandTotal}
            />

            <BookingActionButtons
              currentBooking={currentBooking}
              grandTotal={grandTotal}
              onRequestBooking={handleRequestBooking}
              onPayForBooking={handlePayForBooking}
              onCancelBooking={handleCancelBooking}
            />

            <TrustBadges />
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Bookings;