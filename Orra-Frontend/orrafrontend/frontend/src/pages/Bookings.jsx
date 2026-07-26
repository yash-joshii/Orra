import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

//Shadcn Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Star, ShieldCheck, Lock, CheckCircle2, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator"

//Redux Imports
import { getProductById } from "@/api/listingApi";
import { cancelBooking, createBooking, payForBooking, getBookingById } from '@/api/bookingApi';
import { setLoading as setBookingLoading, setCurrentBooking, setError as setBookingError } from '@/redux/slices/bookingSlice';
import { setSelectedProducts, setLoading, setError } from '@/redux/slices/productslices';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "sonner";


// import { userInfo } from 'node:os';

// shadcn components -> breadcrumbs, date, input, badge, avatar, tooltip, separator, calendar, popover

const Bookings = () => {

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const product = useSelector((state) => state.products.selectedProduct);
  const user = useSelector((state) => state.auth.user);
  const currentBooking = useSelector((state) => state.booking.currentBooking);
  const dispatch = useDispatch();

  const { id } = useParams();
  // const {} = useParams();

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

  const handlePayForBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      const response = await payForBooking(currentBooking.bookingId);
      dispatch(setCurrentBooking(response.data));
      toast.success("Payment successful! Your booking is confirmed.")
    } catch (err) {
      dispatch(setBookingError(err.message));
       toast.error("Payment failed. Please try again.");
    } finally {
      dispatch(setBookingLoading(false));
    }
  }

  const handleCancelBooking = async () => {
    dispatch(setBookingLoading(true));
    try {
      const response = await cancelBooking(currentBooking.bookingId, user.userId);
      dispatch(setCurrentBooking(response.data));
    } catch (err) {
      dispatch(setBookingError(err.message));
    } finally {
      dispatch(setBookingLoading(false));
    }
  };


  useEffect(() => {
    if (!currentBooking) return;
    if (currentBooking.status !== "PENDING" && currentBooking.status !== "ACCEPTED") return;

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

  const rentalDays = startDate && endDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;
  const totalRent = product ? rentalDays * product?.dailyRate : 0;
  const platformFee = totalRent * 0.10;
  const estimatedTax = totalRent * 0.08;
  const grandTotal = totalRent + platformFee + estimatedTax + (product?.securityDeposit || 0);


  return (

    <div className="parent px-25 py-8 space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Browse Devices</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Request to Book</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="heading-detail text-2xl">
        <h1 className="text-4xl font-bold">Review Your Booking</h1>
        <span className="text-[17px] text-gray-500">Confirm the dates and details below to proceed.</span>
      </div>

      <hr className="border-t border-slate-200 my-6" />

      <TooltipProvider>
        <div className="booking-detail w-[1140px] mx-auto flex flex-row items-start p-12 gap-8 justify-center bg-slate-50/50 min-h-screen">

          {/* Left Side: Product & Rental Details */}
          <div className="product-detail w-[660px] bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col gap-6">

            {/* Product Image & Info */}
            <div className="product-image-description flex flex-row gap-6">
              <div className="image w-40 h-40 bg-slate-900 rounded-2xl overflow-hidden shrink-0">
                <img
                  src="/public/camera-booking.avif"
                  // src={data:image/jpeg;base64,${product?.images?.[0]} }
                  alt="Sony A7 IV"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="product-description flex flex-col justify-center space-y-2">
                <div className="badge flex gap-2 items-center">
                  <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 font-semibold border-none rounded-md px-2 py-0.5 text-xs tracking-wide">
                    {product?.category}
                  </Badge>
                  <Badge variant="ghost" className="text-slate-600 flex items-center gap-1 text-xs font-medium px-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 stroke-white" />
                    Instant Booking
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{product?.productName}</h2>
                <p className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="font-semibold text-slate-800">4.9</span>
                  <span className="text-slate-400">(124)</span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="bg-indigo-100 text-indigo-700 w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold">A</span>
                  <span className="text-slate-500">{ }</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500 stroke-white" />
                </p>
                <div className="pricing pt-1">
                  <span className="text-3xl font-bold text-slate-900">$ {product?.dailyRate}</span>
                  <span className="text-sm font-medium text-slate-400 ml-1.5">per day</span>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* Rental Dates Section */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-600" /> Rental Dates
              </h3>

              <div className="date flex flex-row gap-4">
                <div className="w-1/2 space-y-1.5">
                  <Field className="w-full">
                    <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Start Date
                    </FieldLabel>

                    <Popover open={startOpen} onOpenChange={setStartOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-11 justify-between rounded-xl border-slate-200 bg-white font-semibold text-slate-800"
                        >
                          {startDate
                            ? startDate.toLocaleDateString("en-GB")
                            : "Select Date"}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => {
                            setStartDate(date)
                            setStartOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>

                </div>

                <div className="w-1/2 space-y-1.5">
                  <Field className="w-full">
                    <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      End Date
                    </FieldLabel>

                    <Popover open={endOpen} onOpenChange={setEndOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-11 justify-between rounded-xl border-slate-200 bg-white font-semibold text-slate-800"
                        >
                          {endDate
                            ? endDate.toLocaleDateString("en-GB")
                            : "Select Date"}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => {
                            setEndDate(date)
                            setEndOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                </div>
              </div>

              <div className="rental-days-left bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-50">
                <span className="text-sm font-semibold text-indigo-700">Total rental duration: {rentalDays} days</span>
              </div>
            </div>

            {/* Message Box */}
            <div className="message-input space-y-2">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                💬 Message to Owner <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <Textarea
                className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50/30 placeholder:text-slate-400 p-4 resize-none focus-visible:ring-indigo-500"
                placeholder="Hello! I'd like to rent this gear for a weekend project..."
              />
            </div>

          </div>

          {/* Right Side: Pricing Details */}
          <div className="pricing w-[380px] bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col gap-5">

            <h2 className="text-xl font-bold text-slate-950">Price Details</h2>

            <div className="space-y-3.5 pt-1">

              <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
                <span>$ {product?.dailyRate || 0} × {rentalDays} days</span>
                <span className="font-semibold text-slate-800">$ {totalRent.toFixed(2)}</span>
              </div>

              <div className="refund flex justify-between items-center text-sm font-medium text-slate-500">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help flex items-center gap-1 border-b border-dashed border-slate-300 pb-0.5">
                      Refundable Deposit <Lock className="w-3 h-3 text-slate-400" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white p-2 rounded-lg text-xs">
                    Fully refunded upon safe return of the gear.
                  </TooltipContent>
                </Tooltip>
                <span className="font-semibold text-slate-800">${(product?.securityDeposit || 0)}</span>
              </div>

              <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
                <span>Platform Fee (10%)</span>
                <span className="font-semibold text-slate-800">${platformFee.toFixed(2)}</span>
              </div>

              <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-800">${estimatedTax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="bg-slate-100 my-1" />

            <div className="total-price-display flex justify-between items-end">
              <div className="total flex flex-col gap-0.5">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-xs font-medium text-slate-400">Includes ${(product?.securityDeposit || 0)} deposit</span>
              </div>
              <div className="price-display text-3xl font-extrabold text-indigo-600 tracking-tight">
                ${grandTotal.toFixed(2)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="button flex flex-col gap-2.5 pt-2">

              {!currentBooking || currentBooking.status === "REJECTED" ? (
                <Button
                  onClick={handleRequestBooking}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1"
                >
                  Request to Book
                  <span className="text-base font-normal">→</span>
                </Button>
              ) : currentBooking.status === "PENDING" ? (
                <Button
                  disabled
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1"
                >
                  Waiting for Owner Approval
                </Button>
              ) : currentBooking.status === "ACCEPTED" ? (
                <Button
                  onClick={handlePayForBooking}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1"
                >
                  Pay ${grandTotal.toFixed(2)}
                </Button>
              ) : currentBooking.status === "COMPLETED" ? (
                <Button
                  disabled
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1"
                >
                  Booking Confirmed
                </Button>
              ) : null}

              {currentBooking && (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED") && (
                <Button
                  onClick={handleCancelBooking}
                  variant="outline"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1"
                >
                  Cancel Request
                </Button>
              )}

            </div>

            {/* Guarantee Badges */}
            <div className="transaction-detail flex flex-col gap-3 pt-3">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Secure 256-bit encrypted payment</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>You won't be charged until accepted</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Full refund cancellation protection</span>
              </div>
            </div>

          </div>

        </div>
      </TooltipProvider>

    </div>

  );
};
export default Bookings;


