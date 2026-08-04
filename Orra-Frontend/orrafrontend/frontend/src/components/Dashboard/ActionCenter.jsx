import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bell, Clock, PackageCheck, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getIncomingRequests,
  acceptBooking,
  rejectBooking,
} from "@/api/bookingApi";

const ActionCenter = () => {
  const user = useSelector((state) => state.auth.user);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (!user?.userId) {
      setLoading(false);
      return;
    }
    fetchIncomingRequests();
  }, [user]);

  const fetchIncomingRequests = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      const response = await getIncomingRequests(user.userId);
      setRequests(response.data || []);
    } catch (error) {
      console.error("Failed to fetch incoming requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      setActionLoading(bookingId);
      await acceptBooking(bookingId);
      setRequests((prev) => prev.filter((r) => r.bookingId !== bookingId));
    } catch (error) {
      console.error("Failed to accept booking:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      setActionLoading(bookingId);
      await rejectBooking(bookingId);
      setRequests((prev) => prev.filter((r) => r.bookingId !== bookingId));
    } catch (error) {
      console.error("Failed to reject booking:", error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Card className="w-full max-w-sm rounded-3xl p-6 shadow-sm border border-slate-100 bg-white">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
            <Bell className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Action Center
          </h2>
        </div>
        {requests.length > 0 && (
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
            {requests.length} pending
          </span>
        )}
      </div>

      {/* Booking Requests List */}
      <div className="space-y-4">
        {loading ? (
          /* Loading Skeleton */
          <div className="space-y-3">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-slate-100 p-4 space-y-3 animate-pulse bg-slate-50/50"
              >
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-5 bg-slate-200 rounded w-2/3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-10 bg-slate-200 rounded-xl flex-1"></div>
                  <div className="h-10 bg-slate-200 rounded-xl flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mb-2 stroke-[1.5]" />
            <p className="text-sm font-semibold text-slate-800">All caught up!</p>
            <p className="text-xs text-slate-400 mt-0.5">
              No pending booking requests right now.
            </p>
          </div>
        ) : (
          /* Request Cards */
          requests.map((booking) => (
            <div
              key={booking.bookingId}
              className="rounded-2xl border border-amber-200/60 bg-gradient-to-b from-amber-50/40 to-white p-4 space-y-3 shadow-xs transition-all hover:border-amber-300"
            >
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 tracking-wide">
                  <Clock className="w-3 h-3" />
                  BOOKING REQUEST
                </span>
                <span className="text-sm font-bold text-slate-900">
                  ${booking.totalPrice}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1">
                  {booking.listingTitle}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {new Date(booking.startDateTime).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  –{" "}
                  {new Date(booking.endDateTime).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <Button
                  onClick={() => handleAccept(booking.bookingId)}
                  disabled={actionLoading === booking.bookingId}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 h-10 text-xs font-semibold active:scale-[0.98] transition-all shadow-xs"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleDecline(booking.bookingId)}
                  disabled={actionLoading === booking.bookingId}
                  variant="outline"
                  className="flex-1 rounded-xl py-4 h-10 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-rose-600 text-xs font-semibold active:scale-[0.98] transition-all"
                >
                  Decline
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

    </Card>
  );
};

export default ActionCenter;