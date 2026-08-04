import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// UI Components
import { TooltipProvider } from "@/components/ui/tooltip";

// API Actions
import { getProductById } from "@/api/listingApi";
import {
  cancelBooking,
  createBooking,
  getBookingById,
  getMyBookings,
} from "@/api/bookingApi";
import { createOrder } from "@/api/paymentapi";

// Redux Actions
import {
  setLoading as setBookingLoading,
  setCurrentBooking,
  setError as setBookingError,
} from "@/redux/slices/bookingSlice";
import {
  setLoading,
  setError,
  setSelectedProduct,
} from "@/redux/slices/productslices";

// 4 Consolidated Subcomponents
import BookingHeader from "@/components/booking/BookingHeader";
import BookingProductDetails from "@/components/booking/BookingProductDetails";
import BookingPriceSummary from "@/components/booking/BookingPriceSummary";
import BookingActions from "@/components/booking/BookingActions";

const Bookings = ({ bookingData }) => {
  const { Razorpay } = useRazorpay();
  const dispatch = useDispatch();
  const { id: paramId } = useParams();

  // Redux State
  const product = useSelector((state) => state.products.selectedProduct);
  const user = useSelector((state) => state.auth.user);
  const reduxBooking = useSelector((state) => state.booking.currentBooking);

  // Target booking object
  const currentBooking = bookingData || reduxBooking;

  // Get active listingId from URL params OR active booking object
  const targetListingId =
    paramId ||
    currentBooking?.listingId ||
    currentBooking?.productId ||
    currentBooking?.listing?.id ||
    currentBooking?.product?.id;

  // Date & Input State
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState("");

  // 1. Fetch Product Data (Using paramId or targetListingId)
  useEffect(() => {
    if (targetListingId) {
      dispatch(setLoading(true));
      getProductById(targetListingId)
        .then((res) => dispatch(setSelectedProduct(res.data)))
        .catch((err) => dispatch(setError(err.message)))
        .finally(() => dispatch(setLoading(false)));
    }
  }, [targetListingId, dispatch]);

  // 2. Fetch Active Booking if accessing directly via URL route `/booking/:id`
  useEffect(() => {
    const userId = user?.userId || user?.id;
    if (userId && paramId && !currentBooking) {
      getMyBookings(userId)
        .then((res) => {
          const bookings = res.data || [];
          const active = bookings.find(
            (b) =>
              String(b.listingId || b.product?.id || b.productId) === String(paramId) &&
              (b.status === "PENDING" || b.status === "ACCEPTED")
          );
          if (active) dispatch(setCurrentBooking(active));
        })
        .catch((err) => console.error("Error fetching booking state:", err));
    }
  }, [paramId, user, currentBooking, dispatch]);

  // 3. Sync Local Dates when currentBooking Updates
  useEffect(() => {
    if (currentBooking) {
      if (currentBooking.startDateTime) setStartDate(new Date(currentBooking.startDateTime));
      if (currentBooking.endDateTime) setEndDate(new Date(currentBooking.endDateTime));
    }
  }, [currentBooking]);

  // 4. Polling for Status Updates (PENDING -> ACCEPTED)
  useEffect(() => {
    if (!currentBooking?.bookingId) return;
    if (currentBooking.status !== "PENDING" && currentBooking.status !== "ACCEPTED") return;

    const intervalId = setInterval(() => {
      getBookingById(currentBooking.bookingId)
        .then((res) => dispatch(setCurrentBooking(res.data)))
        .catch(() => {
          toast.error("This booking request was updated or declined.");
          dispatch(setCurrentBooking(null));
        });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentBooking?.bookingId, currentBooking?.status, dispatch]);

  // Local Date Formatter Utility (YYYY-MM-DD)
  const formatLocalDate = (date) => {
    if (!date) return null;
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // Pricing Calculation Rules
  const rentalDays =
    startDate && endDate
      ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const totalRent = product ? rentalDays * (product?.dailyRate || 0) : 0;
  const platformFee = totalRent * 0.1;
  const estimatedTax = totalRent * 0.08;
  const grandTotal = totalRent + platformFee + estimatedTax + (product?.securityDeposit || 0);

  // Handlers
  const handleRequestBooking = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    dispatch(setBookingLoading(true));
    try {
      const payload = {
        listingId: product?.productId || product?.id || targetListingId,
        renterId: user?.userId || user?.id,
        startDateTime: formatLocalDate(startDate),
        endDateTime: formatLocalDate(endDate),
        message,
      };
      const response = await createBooking(payload);
      dispatch(setCurrentBooking(response.data));
      toast.success("Booking requested successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to create booking.");
    } finally {
      dispatch(setBookingLoading(false));
    }
  };

  const handlePayForBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      const orderResponse = await createOrder(grandTotal, currentBooking.bookingId);
      const order = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount * 100,
        currency: order.currency,
        name: "Orra Booking",
        description: "Booking Payment",
        order_id: order.razorpayOrderId,
        handler: () => {
          toast.success("Payment received! Confirming your booking...");
          dispatch(setCurrentBooking(null));
          dispatch(setBookingLoading(false));
        },
        modal: {
          ondismiss: () => {
            dispatch(setBookingLoading(false));
            toast.error("Payment cancelled.");
          },
        },
        theme: { color: "#4f46e5" },
      };
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Could not start payment. Please try again.");
      dispatch(setBookingLoading(false));
    }
  };

  const handleCancelBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      await cancelBooking(currentBooking.bookingId, user?.userId || user?.id);
      dispatch(setCurrentBooking(null));
      toast.success("Booking request cancelled.");
    } catch (err) {
      dispatch(setBookingError(err.message));
    } finally {
      dispatch(setBookingLoading(false));
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* 1. Header (Breadcrumb, Title, Subtitle) */}
      <BookingHeader />

      <TooltipProvider>
        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10 xl:gap-12 p-5 sm:p-8 lg:p-10 bg-slate-50/60 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 min-h-[60vh]">
          
          {/* 2. Left Side Details (Product, Date Picker, Owner Message) */}
          <div className="w-full flex-1 min-w-0">
            <BookingProductDetails
              product={product}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startOpen={startOpen}
              setStartOpen={setStartOpen}
              endOpen={endOpen}
              setEndOpen={setEndOpen}
              rentalDays={rentalDays}
              message={message}
              setMessage={setMessage}
            />
          </div>

          {/* 3. Right Side Pricing & Actions (Sticky on Desktop) */}
          <div className="w-full lg:w-[380px] xl:w-[420px] bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-6 shrink-0 lg:sticky lg:top-28">
            
            {/* Price Breakdown */}
            <BookingPriceSummary
              product={product}
              rentalDays={rentalDays}
              totalRent={totalRent}
              platformFee={platformFee}
              estimatedTax={estimatedTax}
              grandTotal={grandTotal}
            />

            {/* Action Buttons & Security Badges */}
            <BookingActions
              currentBooking={currentBooking}
              grandTotal={grandTotal}
              onRequestBooking={handleRequestBooking}
              onPayForBooking={handlePayForBooking}
              onCancelBooking={handleCancelBooking}
            />
          </div>
          
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Bookings;