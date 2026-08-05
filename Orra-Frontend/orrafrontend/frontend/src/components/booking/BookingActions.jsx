import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

const BookingActions = ({
  currentBooking,
  grandTotal,
  onRequestBooking,
  onPayForBooking,
  onCancelBooking,
}) => {
  // Highly responsive button styles
  const baseBtn =
    "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer";
  const cancelBtn =
    "w-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-bold h-11 sm:h-12 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all cursor-pointer";

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6 w-full">
      
      {/* Dynamic Action Buttons */}
      <div className="flex flex-col gap-2.5 sm:gap-3 pt-2">
        {!currentBooking ? (
          <Button onClick={onRequestBooking} className={baseBtn}>
            Request to Book 
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        ) : currentBooking.status === "PENDING" ? (
          <Button 
            disabled 
            className="w-full bg-slate-100 text-slate-400 font-bold h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base cursor-not-allowed opacity-100"
          >
            Waiting for Owner Approval
          </Button>
        ) : currentBooking.status === "ACCEPTED" ? (
          <Button onClick={onPayForBooking} className={baseBtn}>
            Pay Rs {grandTotal.toFixed(2)} to Confirm
          </Button>
        ) : currentBooking.status === "COMPLETED" || currentBooking.status === "CONFIRMED" ? (
          <Button 
            disabled 
            className="w-full bg-emerald-50/80 text-emerald-600 border border-emerald-100 font-bold h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base cursor-not-allowed opacity-100 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            Booking Confirmed
          </Button>
        ) : null}

        {/* Show Cancel Option when Request is active */}
        {currentBooking &&
          (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED") && (
            <Button onClick={onCancelBooking} variant="outline" className={cancelBtn}>
              Cancel Request
            </Button>
          )}
      </div>

      {/* Trust & Security Badges */}
      <div className="flex flex-col gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200/80">
        <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-medium text-slate-500">
          <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 shrink-0" />
          <span className="leading-tight">Secure 256-bit encrypted payment</span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-medium text-slate-500">
          <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 shrink-0" />
          <span className="leading-tight">You won't be charged until accepted</span>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-medium text-slate-500">
          <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400 shrink-0" />
          <span className="leading-tight">Full refund cancellation protection</span>
        </div>
      </div>
      
    </div>
  );
};

export default BookingActions;