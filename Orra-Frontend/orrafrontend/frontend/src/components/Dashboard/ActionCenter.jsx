import { Button } from "@/components/ui/button"
import {
  Card
} from "@/components/ui/card"
import { Bell, Search, User, Check } from "lucide-react";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getIncomingRequests, acceptBooking, rejectBooking } from '@/api/bookingApi';

const ActionCenter = () => {

  const user = useSelector((state) => state.auth.user);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toShip, setToShip] = useState([]);
  const [shipLoading, setShipLoading] = useState(true);

  useEffect(() => {
    fetchIncomingRequests();
    // fetchToShip();
  }, [user]);

  const fetchIncomingRequests = async () => {
    try {
      setLoading(true);
      const response = await getIncomingRequests(user.userId);
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch incoming requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchToShip = async () => {
  //   try {
  //     setShipLoading(true);
  //     const response = await getOwnerBookings(user.id);
  //     const paidOnly = response.data.filter((b) => b.status === "PAID");
  //     setToShip(paidOnly);
  //   } catch (error) {
  //     console.error("Failed to fetch bookings to ship:", error);
  //   } finally {
  //     setShipLoading(false);
  //   }
  // };

  const handleAccept = async (bookingId) => {
    try {
      await acceptBooking(bookingId);
      setRequests((prev) => prev.filter((r) => r.bookingId !== bookingId));
    } catch (error) {
      console.error("Failed to accept booking:", error);
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      setRequests((prev) => prev.filter((r) => r.bookingId !== bookingId));
    } catch (error) {
      console.error("Failed to reject booking:", error);
    }
  };

  // const handleMarkShipped = async (bookingId) => {
  //   try {
  //     await shipBooking(bookingId);
  //     setToShip((prev) => prev.filter((b) => b.bookingId !== bookingId));
  //   } catch (error) {
  //     console.error("Failed to mark booking as shipped:", error);
  //   }
  // };

  return (
    <Card className="w-full max-w-sm rounded-3xl p-6 shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6 text-slate-900" />
        <h2 className="text-xl font-bold text-slate-900">Action Center</h2>
      </div>

      {/* Section 1: Booking Requests */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-slate-400">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-slate-400">No pending requests.</p>
        ) : (
          requests.map((booking) => (
            <div
              key={booking.bookingId}
              className="rounded-2xl border border-orange-200 bg-orange-50/30 p-4 space-y-3"
            >
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-orange-600 tracking-wider">BOOKING REQUEST</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{booking.listingTitle}</h3>
                <p className="text-sm text-slate-500">
                  {new Date(booking.startDateTime).toLocaleDateString("en-GB")} -{" "}
                  {new Date(booking.endDateTime).toLocaleDateString("en-GB")} • $
                  {booking.totalPrice} total
                </p>
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  onClick={() => handleAccept(booking.bookingId)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-5"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleDecline(booking.bookingId)}
                  variant="outline"
                  className="flex-1 rounded-xl py-5 border-slate-200 text-slate-800"
                >
                  Decline
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Section 2: Ready to Ship */}
      {/* <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 tracking-wide">READY TO SHIP</h3>
        {shipLoading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : toShip.length === 0 ? (
          <p className="text-sm text-slate-400">Nothing waiting to ship.</p>
        ) : (
          toShip.map((booking) => (
            <div
              key={booking.bookingId}
              className="rounded-2xl border border-blue-200 bg-blue-50/30 p-4 space-y-3"
            >
              <span className="text-blue-600 tracking-wider text-xs font-semibold">PAID • AWAITING SHIPMENT</span>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{booking.listingTitle}</h3>
                <p className="text-sm text-slate-500">
                  {new Date(booking.startDateTime).toLocaleDateString("en-GB")} -{" "}
                  {new Date(booking.endDateTime).toLocaleDateString("en-GB")}
                </p>
              </div>
              <Button onClick={() => handleMarkShipped(booking.bookingId)} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5">
                Mark as Shipped
              </Button>
            </div>
          ))
        )}
      </div> */}
    </Card>
  );
};

export default ActionCenter;