



const ActiveListingCard = ({ listing }) => {
  return (
   <div className="flex items-center gap-6 p-6 rounded-3xl border bg-white shadow-sm">

      {/* Image */}
      <img
        src={listing.imageUrl}
        alt={listing.title}
        className="w-48 h-32 rounded-2xl object-cover flex-shrink-0"
      />

      {/* Details */}
      <div className="flex flex-col justify-center">

        <h2 className="text-2xl font-bold mb-4">
          {listing.title}
        </h2>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">
            Category :
          </span>{" "}
          {listing.category}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">
            Price / Day :
          </span>{" "}
          ₹{listing.pricePerDay}
        </p>

      </div>

    </div>
  );
};

export default ActiveListingCard;