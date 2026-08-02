import { Card, CardHeader } from "@/components/ui/card";

const ActiveListingCard = ({ listing }) => {
  return (
    <Card className="w-full flex-row items-center gap-8 p-6 rounded-3xl border shadow-sm">

      {/* Product Image */}
      <img
        src={listing.imageUrl || "/placeholder.png"}
        alt={listing.title}
        className="w-56 h-36 rounded-2xl object-cover"
      />

      {/* Product Details */}
      <CardHeader className="flex-1 p-0">

        <h2 className="text-2xl font-bold text-gray-900">
          {listing.title}
        </h2>

        <div className="mt-5 space-y-3 text-[15px] text-gray-700">

          <div className="flex">
            <span className="w-32 font-semibold">
              Category
            </span>

            <span>
              : {listing.category}
            </span>
          </div>

          <div className="flex">
            <span className="w-32 font-semibold">
              Price / Day
            </span>

            <span>
              : ₹{listing.pricePerDay}
            </span>
          </div>

          <div className="flex">
            <span className="w-32 font-semibold">
              Status
            </span>

            <span className="text-green-600 font-semibold">
              : Active
            </span>
          </div>

        </div>

      </CardHeader>

    </Card>
  );
};

export default ActiveListingCard;