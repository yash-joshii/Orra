import React from 'react'
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
import { Star, ShieldCheck, Lock, CheckCircle2, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator"

// shadcn components -> breadcrumbs, date, input, badge, avatar, tooltip, separator, calendar, popover

const Booking = () => {
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
                  alt="Sony A7 IV"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="product-description flex flex-col justify-center space-y-2">
                <div className="badge flex gap-2 items-center">
                  <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 font-semibold border-none rounded-md px-2 py-0.5 text-xs tracking-wide">
                    CAMERAS
                  </Badge>
                  <Badge variant="ghost" className="text-slate-600 flex items-center gap-1 text-xs font-medium px-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 stroke-white" />
                    Instant Booking
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sony A7 IV + 24-70mm Lens</h2>
                <p className="text-sm font-medium text-slate-600 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="font-semibold text-slate-800">4.9</span>
                  <span className="text-slate-400">(124)</span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="bg-indigo-100 text-indigo-700 w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold">A</span>
                  <span className="text-slate-500">By Alex Chen</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500 stroke-white" />
                </p>
                <div className="pricing pt-1">
                  <span className="text-3xl font-bold text-slate-900">$45</span>
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
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Start Date</label>
                  <div className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center text-slate-800 font-semibold text-sm">
                    20-06-2026
                  </div>
                </div>

                <div className="w-1/2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">End Date</label>
                  <div className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center text-slate-800 font-semibold text-sm">
                    23-06-2026
                  </div>
                </div>
              </div>

              <div className="rental-days-left bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-50">
                <span className="text-sm font-semibold text-indigo-700">Total rental duration: 3 days</span>
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
                <span>$45 × 3 days</span>
                <span className="font-semibold text-slate-800">$135.00</span>
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
                <span className="font-semibold text-slate-800">$500.00</span>
              </div>

              <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
                <span>Platform Fee (10%)</span>
                <span className="font-semibold text-slate-800">$13.50</span>
              </div>

              <div className="days-calculation flex justify-between items-center text-sm font-medium text-slate-500">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-800">$10.80</span>
              </div>
            </div>

            <Separator className="bg-slate-100 my-1" />

            <div className="total-price-display flex justify-between items-end">
              <div className="total flex flex-col gap-0.5">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-xs font-medium text-slate-400">Includes $500 deposit</span>
              </div>
              <div className="price-display text-3xl font-extrabold text-indigo-600 tracking-tight">
                $659.30
              </div>
            </div>

            {/* Action Buttons */}
            <div className="button flex flex-col gap-2.5 pt-2">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1">
                Confirm & Pay <span className="text-base font-normal">→</span>
              </Button>
              <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800 font-semibold h-12 rounded-xl text-sm transition-colors">
                Cancel
              </Button>
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
  )
}


export default Booking
