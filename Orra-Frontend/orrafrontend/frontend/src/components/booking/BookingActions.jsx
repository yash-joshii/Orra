import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle2, ShieldCheck } from "lucide-react";

const BookingActions = ({
  currentBooking,
  grandTotal,
  onRequestBooking,
  onPayForBooking,
  onCancelBooking,
}) => {
  const baseBtn =
    "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1 cursor-pointer";
  const cancelBtn =
    "w-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold h-11 rounded-xl text-sm transition-colors cursor-pointer";

  return (
    <div className="space-y-4">
      {/* Dynamic Action Buttons */}
      <div className="button flex flex-col gap-2.5 pt-2">
        {!currentBooking ? (
          <Button onClick={onRequestBooking} className={baseBtn}>
            Request to Book <span className="text-base font-normal">→</span>
          </Button>
        ) : currentBooking.status === "PENDING" ? (
          <Button disabled className="w-full bg-slate-100 text-slate-400 font-semibold h-12 rounded-xl text-sm cursor-not-allowed">
            Waiting for Owner Approval
          </Button>
        ) : currentBooking.status === "ACCEPTED" ? (
          <Button onClick={onPayForBooking} className={baseBtn}>
            Pay ${grandTotal.toFixed(2)}
          </Button>
        ) : currentBooking.status === "COMPLETED" || currentBooking.status === "CONFIRMED" ? (
          <Button disabled className="w-full bg-emerald-50 text-emerald-600 font-semibold h-12 rounded-xl text-sm cursor-not-allowed">
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
      <div className="transaction-detail flex flex-col gap-3 pt-3 border-t border-slate-100">
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
  );
};

export default BookingActions;