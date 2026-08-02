import { Button } from "@/components/ui/button";

const BookingActionButtons = ({ currentBooking, grandTotal, onRequestBooking, onPayForBooking, onCancelBooking }) => {
  const baseBtn = "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl text-sm transition-colors shadow-sm shadow-indigo-100 flex items-center justify-center gap-1";

  return (
    <div className="button flex flex-col gap-2.5 pt-2">
      {!currentBooking ? (
        <Button onClick={onRequestBooking} className={baseBtn}>
          Request to Book <span className="text-base font-normal">→</span>
        </Button>
      ) : currentBooking.status === "PENDING" ? (
        <Button disabled className={baseBtn}>Waiting for Owner Approval</Button>
      ) : currentBooking.status === "ACCEPTED" ? (
        <Button onClick={onPayForBooking} className={baseBtn}>Pay ${grandTotal.toFixed(2)}</Button>
      ) : currentBooking.status === "COMPLETED" ? (
        <Button disabled className={baseBtn}>Booking Confirmed</Button>
      ) : null}

      {currentBooking && (currentBooking.status === "PENDING" || currentBooking.status === "ACCEPTED") && (
        <Button onClick={onCancelBooking} variant="outline" className={baseBtn}>
          Cancel Request
        </Button>
      )}
    </div>
  );
};

export default BookingActionButtons;