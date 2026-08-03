import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Star, CheckCircle2, CalendarDays, MessageSquare } from "lucide-react";
import LazyImage from "../common/LazyImage";

const BookingProductDetails = ({
  product,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startOpen,
  setStartOpen,
  endOpen,
  setEndOpen,
  rentalDays,
  message,
  setMessage,
}) => {
  // Extract image URL safely
  const rawImage =
    product?.images?.[0] || product?.imageUrl?.[0] || product?.imageUrl;

  const imageUrl =
    typeof rawImage === "string"
      ? rawImage
      : rawImage?.imageBase64 || "https://placehold.co/800x500?text=No+Image";

  return (
    <div className="left flex-1 bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-8">
      {/* 1. Product Summary Card */}
      <div className="product-image-description flex flex-row gap-6">
        <div className="image w-40 h-40 bg-slate-900 rounded-2xl overflow-hidden shrink-0">
          <LazyImage
            src={imageUrl}
            alt={product?.productName || "Product image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="product-description flex flex-col justify-center space-y-2">
          <div className="badge flex gap-2 items-center">
            <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 font-semibold border-none rounded-md px-2 py-0.5 text-xs tracking-wide">
              {product?.category}
            </Badge>
            <Badge
              variant="ghost"
              className="text-slate-600 flex items-center gap-1 text-xs font-medium px-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 stroke-white" />
              Instant Booking
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {product?.productName}
          </h2>
          <p className="text-sm font-medium text-slate-600 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            <span className="font-semibold text-slate-800">4.9</span>
            <span className="text-slate-400">(124)</span>
          </p>
          <div className="pricing pt-1">
            <span className="text-3xl font-bold text-slate-900">
              ${product?.dailyRate || 0}
            </span>
            <span className="text-sm font-medium text-slate-400 ml-1.5">
              per day
            </span>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-100 my-6" />

      {/* 2. Rental Date Picker */}
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
                      setStartDate(date);
                      setStartOpen(false);
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
                      setEndDate(date);
                      setEndOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </div>
        </div>

        <div className="rental-days-left bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-50">
          <span className="text-sm font-semibold text-indigo-700">
            Total rental duration: {rentalDays} days
          </span>
        </div>
      </div>

      <Separator className="bg-slate-100 my-6" />

      {/* 3. Owner Message Input */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" /> Message to Owner
        </h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi! I'd like to rent this gear for a photoshoot..."
          className="w-full h-28 p-4 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default BookingProductDetails;