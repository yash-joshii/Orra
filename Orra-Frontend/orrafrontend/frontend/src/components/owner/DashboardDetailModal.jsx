import React from "react";

const DashboardDetailModal = ({
  isOpen,
  onClose,
  title,
  selectedCard,
  data,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[500px] overflow-y-auto">
  {loading ? (
    <div className="text-center py-10 text-gray-500">
      Loading...
    </div>
  ) : data.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      No data available.
    </div>
  ) : (
    <>
      {selectedCard === "earnings" && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3">Booking ID</th>
              <th className="text-left p-3">Listing</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.bookingId}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{item.bookingId}</td>
                <td className="p-3">{item.listingTitle}</td>
                <td className="p-3 font-semibold text-green-600">
                  ₹{item.amount}
                </td>
                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCard === "listings" && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Category</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCard === "completed" && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3">Booking ID</th>
              <th className="text-left p-3">Listing</th>
              <th className="text-left p-3">Renter</th>
              <th className="text-left p-3">Completed</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.bookingId}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{item.bookingId}</td>
                <td className="p-3">{item.listingTitle}</td>
                <td className="p-3">{item.renterName}</td>
                <td className="p-3">
                  {new Date(item.completedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )}
</div>


        </div>
      </div>
  );
};

export default DashboardDetailModal;


