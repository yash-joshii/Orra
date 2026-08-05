import React, { useEffect, useState } from "react";
import ProductCard from "@/components/admin/ProductCard";
import { Button } from "@/components/ui/button";
import { approveProduct, getProducts, rejectProduct } from "@/api/admin/adminApi";
import LogoLoader from "@/components/common/LogoLoader";
import { Check, X, CheckCircle2 } from "lucide-react";

const ProductApproval = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchPending = () => {
    setLoading(true);
    getProducts("PENDING")
      .then((res) => setProducts(res?.data?.content || []))
      .catch((err) => console.error("Error fetching pending products:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);
      await approveProduct(id);
      fetchPending();
    } catch (err) {
      console.error("Failed to approve product:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessingId(id);
      await rejectProduct(id);
      fetchPending();
    } catch (err) {
      console.error("Failed to reject product:", err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Product Approvals</span>
            {!loading && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                {products.length} Pending
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Review and verify newly submitted product listings before publishing them.
          </p>
        </div>
      </div>

      {/* Main Content View */}
      {loading ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <LogoLoader />
        </div>
      ) : products.length === 0 ? (
        /* Empty Queue State */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center gap-3 shadow-xs my-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-2xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">All caught up!</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              There are currently no products waiting for administrative approval.
            </p>
          </div>
        </div>
      ) : (
        /* Product Cards Responsive Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => {
            const isProcessing = processingId === p.productId;

            return (
              <ProductCard
                key={p.productId}
                product={p}
                actions={
                  <div className="flex items-center gap-2 w-full">
                    {/* Approve Action */}
                    <Button
                      size="sm"
                      disabled={isProcessing}
                      onClick={() => handleApprove(p.productId)}
                      className="flex-1 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs cursor-pointer transition-all"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>

                    {/* Reject Action */}
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isProcessing}
                      onClick={() => handleReject(p.productId)}
                      className="flex-1 h-9 rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-semibold text-xs cursor-pointer transition-all"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Reject
                    </Button>
                  </div>
                }
              />
            );
          })}
        </div>
      )}

    </div>
  );
};

export default ProductApproval;