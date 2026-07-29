import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Shadcn Imports
import { TooltipProvider } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

//Redux Imports
import { getProductById } from "@/api/listingApi";
import {
  cancelBooking,
  createBooking,
  payForBooking,
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
import { toast } from "sonner";

// Split-out booking components
import BookingBreadcrumb from "../components/booking/BookingBreadcrumb";
import ProductSummaryCard from "../components/booking/ProductSummaryCard";
import RentalDatePicker from "../components/booking/RentalDatePicker";
import PriceSummary from "../components/booking/PriceSummary";
import BookingActionButtons from "../components/booking/BookingActionButtons";
import TrustBadges from "../components/booking/TrustBadges";
import { useRazorpay } from "react-razorpay";
import { createOrder } from "@/api/paymentapi";

const Bookings = () => {
  const { Razorpay } = useRazorpay();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const product = useSelector((state) => state.products.selectedProduct);
  const user = useSelector((state) => state.auth.user);
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    console.log("Product ID:", id);
    fetchProduct();
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

  const handleRequestBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      const payload = {
        listingId: product.productId,
        renterId: user.userId,
        startDateTime: startDate,
        endDateTime: endDate,
      };
      console.log("user object:", user);
      console.log("payload being sent:", payload);
      const response = await createBooking(payload);
      dispatch(setCurrentBooking(response.data));
    } catch (err) {
      dispatch(setBookingError(err.message));
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
  const handlePayForBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      // Step 1: create order via .NET API
      const orderResponse = await createOrder(
        grandTotal,
        currentBooking.bookingId,
      );
      const order = orderResponse.data;

      // Step 2: open Razorpay checkout using the hook
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

  const handleCancelBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      const response = await cancelBooking(
        currentBooking.bookingId,
        user.userId,
      );
      dispatch(setCurrentBooking(response.data));
    } catch (err) {
      dispatch(setBookingError(err.message));
    } finally {
      dispatch(setBookingLoading(false));
    }
  };

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
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentBooking?.bookingId, currentBooking?.status]);

  const rentalDays =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;
  const totalRent = product ? rentalDays * product?.dailyRate : 0;
  const platformFee = totalRent * 0.1;
  const estimatedTax = totalRent * 0.08;
  const grandTotal =
    totalRent + platformFee + estimatedTax + (product?.securityDeposit || 0);

  return (
    <div className="parent px-25 py-8 space-y-8">
      <BookingBreadcrumb />

      <div className="heading-detail text-2xl">
        <h1 className="text-4xl font-bold">Review Your Booking</h1>
        <span className="text-[17px] text-gray-500">
          Confirm the dates and details below to proceed.
        </span>
      </div>

      <hr className="border-t border-slate-200 my-6" />

      <TooltipProvider>
        <div className="booking-detail w-[1140px] mx-auto flex flex-row items-start p-12 gap-8 justify-center bg-slate-50/50 min-h-screen">
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
