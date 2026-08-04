import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Star, CheckCircle2, CalendarDays, MessageSquare } from "lucide-react";

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
  const imageUrl =
    product?.images?.[0]?.imageUrl ||
    product?.imageUrl ||
    "https://placehold.co/800x500?text=No+Image";

  return (
    <div className="flex-1 w-full bg-white border border-slate-200/80 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-6 sm:gap-8 lg:gap-10">
      
      {/* 1. Product Summary Card */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 lg:gap-8">
        {/* Product Image */}
        <div className="w-full sm:w-36 md:w-44 aspect-video sm:aspect-square bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
          <img
            src={imageUrl}
            alt={product?.productName || "Product image"}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-2 sm:space-y-2.5 w-full">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold border-none rounded-lg px-2.5 py-1 text-[10px] sm:text-xs tracking-wider uppercase">
              {product?.category || "Gear"}
            </Badge>
            <Badge
              variant="ghost"
              className="text-slate-600 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2 py-1 bg-slate-50 rounded-lg border border-slate-100"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Instant Booking
            </Badge>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {product?.productName || "Loading Product..."}
          </h2>
          
          <div className="flex items-center gap-1.5 text-sm sm:text-base font-medium text-slate-600">
            <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400 stroke-amber-400" />
            <span className="font-bold text-slate-800">4.9</span>
            <span className="text-slate-400 font-medium">(124 reviews)</span>
          </div>
          
          <div className="pt-2 sm:pt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rs {product?.dailyRate || 0}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-400">
              / day
            </span>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-200/80" />

      {/* 2. Rental Date Picker */}
      <div className="space-y-4 sm:space-y-5">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 
          Rental Dates
        </h3>

        {/* Calendar Inputs Grid - Stacks on mobile, Side-by-side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Start Date */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Field className="w-full">
              <FieldLabel className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Start Date
              </FieldLabel>
              <Popover open={startOpen} onOpenChange={setStartOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full h-12 sm:h-14 justify-between rounded-xl sm:rounded-2xl border-slate-200 bg-white text-sm sm:text-base font-semibold transition-all hover:bg-slate-50 hover:border-slate-300 ${!startDate ? "text-slate-400" : "text-slate-900"}`}
                  >
                    {startDate ? startDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Select pick-up date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl border-slate-200" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    onSelect={(date) => {
                      setStartDate(date);
                      setStartOpen(false);
                    }}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Field className="w-full">
              <FieldLabel className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                End Date
              </FieldLabel>
              <Popover open={endOpen} onOpenChange={setEndOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full h-12 sm:h-14 justify-between rounded-xl sm:rounded-2xl border-slate-200 bg-white text-sm sm:text-base font-semibold transition-all hover:bg-slate-50 hover:border-slate-300 ${!endDate ? "text-slate-400" : "text-slate-900"}`}
                  >
                    {endDate ? endDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : "Select return date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl border-slate-200" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      if (date < today) return true;
                      if (startDate && date < startDate) return true;
                      return false;
                    }}
                    onSelect={(date) => {
                      setEndDate(date);
                      setEndOpen(false);
                    }}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </div>

        </div>

        {/* Rental Duration Banner */}
        {rentalDays > 0 && (
          <div className="mt-2 bg-indigo-50/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-indigo-100/50 flex items-center justify-center">
            <span className="text-sm sm:text-base font-bold text-indigo-700 tracking-tight">
              Total rental duration: {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
            </span>
          </div>
        )}
      </div>

      {/* 3. Owner Message Input (Styled and ready to uncomment if needed) */}
      {/* 
      <Separator className="bg-slate-200/80 my-2" />
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" /> 
          Message to Owner
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Introduce yourself and share a brief detail about what you'll be using the equipment for.
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi! I'd love to rent your gear for an upcoming project..."
          className="w-full min-h-[120px] sm:min-h-[140px] p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white text-sm sm:text-base font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-y placeholder:text-slate-400 shadow-sm"
        />
      </div> 
      */}

    </div>
  );
};

export default BookingProductDetails;