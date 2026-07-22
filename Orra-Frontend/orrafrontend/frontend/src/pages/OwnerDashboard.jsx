import { acceptBooking, rejectBooking } from '@/api/bookingApi';
import React, { useState } from 'react'

function OwnerDashboard() {

    const OwnerDashboard = () => {
        const [bookingId, setBookingId] = useState("");
        const [result, setResult] = useState(null);

        const handleAccept = async () => {
            const response = await acceptBooking(bookingId);
            setResult(response.data);
        };

        const handleReject = async () => {
            const response = await rejectBooking(bookingId);
            setResult(response.data);
        };
    };


  return (
     <div className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Dummy Owner Dashboard</h1>
      <input
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        placeholder="Enter Booking ID"
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <Button onClick={handleAccept}>Accept</Button>
        <Button variant="outline" onClick={handleReject}>Reject</Button>
      </div>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}

export default OwnerDashboard;