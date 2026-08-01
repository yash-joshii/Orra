import { getProductById } from "@/api/listingApi";
import LogoLoader from "@/components/common/LogoLoader";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import ProductDetails from "@/components/Productpagecomponent/ProductDetails";
import ProductOwner from "@/components/Productpagecomponent/ProductOwner";
import ProductSummary from "@/components/Productpagecomponent/ProductSummary";
import {
  setError,
  setLoading,
  setSelectedProduct,
} from "@/redux/slices/productslices";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Productpage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (selectedProduct?.productId == id) return;

    const fetchProduct = async () => {
      dispatch(setLoading(true));

      try {
        const res = await getProductById(id);

        dispatch(setSelectedProduct(res.data));
      } catch (err) {
        dispatch(
          setError(err.response?.data?.message || "Failed to fetch product"),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduct();
  }, [id]);

  const product = selectedProduct;

  if (loading)
    return (
      <div className="bg-gray-200 py-8 px-6">
        <div className="flex flex-wrap gap-[30px] justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product)
    return <div className="p-6 text-gray-500">Product not found</div>;
  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: main content */}
        <div className="lg:col-span-2">
          <ProductDetails data={product} />
        </div>

        {/* Right: sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <ProductSummary data={product} />
            <ProductOwner data={product.owner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
