const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">

        {/* Left */}
        <div className="lg:col-span-2">

          {/* Main Image */}
          <div className="w-full h-[500px] bg-gray-300 rounded-3xl"></div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-xl bg-gray-300"
              />
            ))}
          </div>

          {/* Title */}
          <div className="mt-8 h-8 w-2/3 rounded bg-gray-300"></div>

          {/* Location */}
          <div className="mt-4 h-5 w-40 rounded bg-gray-300"></div>

          {/* Description */}
          <div className="mt-10 space-y-3">
            <div className="h-4 rounded bg-gray-300"></div>
            <div className="h-4 rounded bg-gray-300"></div>
            <div className="h-4 w-5/6 rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="h-[250px] rounded-2xl bg-gray-300"></div>
          <div className="h-[200px] rounded-2xl bg-gray-300"></div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;