import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, PackageX } from "lucide-react";

import { getProductById } from "@/api/listingApi";
import ProductDetails from "@/components/Productpagecomponent/ProductDetails";
import ProductOwner from "@/components/Productpagecomponent/ProductOwner";
import ProductSummary from "@/components/Productpagecomponent/ProductSummary";
import LogoLoader from "@/components/common/LogoLoader";
import {
  setError,
  setLoading,
  setSelectedProduct,
} from "@/redux/slices/productslices";

const Productpage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
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
          setError(err.response?.data?.message || "Failed to fetch product details")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduct();
  }, [id, selectedProduct?.productId, dispatch]);

  const product = selectedProduct;

  // Loading View
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <LogoLoader />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-rose-100 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base">Error Loading Product</h3>
        <p className="text-xs text-slate-500">{error}</p>
      </div>
    );
  }

  // Product Not Found State
  if (!product) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 border border-slate-200/60 flex items-center justify-center mx-auto">
          <PackageX className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base">Product Not Found</h3>
        <p className="text-xs text-slate-500">
          The requested listing could not be found or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Main Content */}
        <div className="lg:col-span-2">
          <ProductDetails data={product} />
        </div>

        {/* Right: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <ProductSummary data={product} />
            {product?.owner && <ProductOwner data={product.owner} />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Productpage;