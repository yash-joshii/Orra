const ProductCardSkeleton = () => {
  return (
    <div className="w-[30%] rounded-[25px] bg-white shadow-md overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-60 bg-gray-300"></div>

      {/* Body */}
      <div className="p-4">
        <div className="h-5 w-24 bg-gray-300 rounded mb-4"></div>

        <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>

        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>

        <div className="h-px bg-gray-200 mb-4"></div>

        <div className="flex justify-between items-center">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>

          <div className="w-10 h-10 rounded-xl bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;