import React from "react";
import { Edit2, Trash2, Calendar } from "lucide-react";

const ListingCard = ({ listing, activeBookings = [], onEdit, onDelete }) => {
  const {
    productId,
    id,
    title,
    productName,
    categoryName,
    pricePerDay,
    rentalPrice,
    dailyRate,
    earnings = 0,
    rentalsCount = 0,
    rentals = 0,
    imageUrl,
    images,
  } = listing || {};

  const pId = productId || id;

  // Extract display variables
  const displayTitle = title || productName || "Untitled Product";
  const displayImage =
    imageUrl || (images && images.length > 0 ? images[0] : "") || "/placeholder.jpg";
  const displayCategory = categoryName || listing?.category?.name || "CAMERAS";
  const displayPrice = pricePerDay || rentalPrice || dailyRate || 0;

  // ---------------- BOOKING RESTRICTION CHECK ----------------
  // Check if this product has an ACTIVE or PENDING booking
  const activeOrPendingBooking = activeBookings.find((booking) => {
    const bookingProductId =
      booking?.productId || booking?.product?.id || booking?.product?.productId;
    const bookingStatus = String(
      booking?.bookingStatus || booking?.status || ""
    ).toUpperCase();

    const isMatch = Number(bookingProductId) === Number(pId);
    const isRestrictedStatus = [
      "ACCEPTED",
      "APPROVED",
      "ACTIVE",
      "SHIPPED",
      "PENDING",
    ].includes(bookingStatus);

    return isMatch && isRestrictedStatus;
  });

  const isRestricted = Boolean(activeOrPendingBooking);
  const bookingStatusLabel = activeOrPendingBooking
    ? String(activeOrPendingBooking.bookingStatus || activeOrPendingBooking.status).toUpperCase()
    : "";
  // -----------------------------------------------------------

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Banner Image & Active Badge */}
      <div className="relative w-full h-48 bg-slate-100">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover"
        />

        {/* Render status badge if product has an active/pending booking */}
        {isRestricted && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-white text-xs font-semibold px-3 py-1 rounded-md shadow-xs ${
                bookingStatusLabel === "PENDING" ? "bg-amber-500" : "bg-emerald-500"
              }`}
            >
              {bookingStatusLabel === "PENDING" ? "Pending Booking" : "Active Booking"}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {displayCategory}
          </span>
          <div className="text-right">
            <span className="font-bold text-slate-900 text-base">${displayPrice}</span>
            <span className="text-xs text-slate-400 font-medium">/day</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 text-base truncate" title={displayTitle}>
          {displayTitle}
        </h3>

        <hr className="border-slate-100" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-y-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              EARNINGS
            </span>
            <span className="font-bold text-emerald-600 text-sm">${earnings}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              RENTALS
            </span>
            <span className="font-bold text-slate-700 text-sm flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" />
              {rentalsCount || rentals}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3 flex items-center justify-around">
        {/* Edit Button */}
        <button
          onClick={() => !isRestricted && onEdit && onEdit(listing)}
          disabled={isRestricted}
          title={
            isRestricted
              ? `Cannot edit while booking status is ${bookingStatusLabel}`
              : "Edit listing"
          }
          className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
            isRestricted
              ? "text-slate-300 cursor-not-allowed opacity-60"
              : "text-slate-600 hover:text-slate-900 cursor-pointer"
          }`}
        >
          <Edit2 size={14} />
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => !isRestricted && onDelete && onDelete(listing)}
          disabled={isRestricted}
          title={
            isRestricted
              ? `Cannot delete while booking status is ${bookingStatusLabel}`
              : "Delete listing"
          }
          className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
            isRestricted
              ? "text-slate-300 cursor-not-allowed opacity-60"
              : "text-rose-500 hover:text-rose-600 cursor-pointer"
          }`}
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListingCard;