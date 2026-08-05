import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/admin/ProductCard";
import { getProducts } from "@/api/admin/adminApi";
import LogoLoader from "@/components/common/LogoLoader";
import { Package, PackageX } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const status = tab === "ALL" ? undefined : tab;
    getProducts(status)
      .then((res) => setProducts(res?.data?.content || []))
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <div className="space-y-6">
      
      {/* Header & Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Product Catalog</span>
            {!loading && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {products.length} Items
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            View and monitor all platform equipment listings across statuses.
          </p>
        </div>

        {/* Tab Filters */}
        <Tabs value={tab} onValueChange={setTab} className="w-full sm:w-auto">
          <TabsList className="bg-slate-100 p-1 rounded-2xl h-11 border border-slate-200/60">
            <TabsTrigger value="ALL" className="rounded-xl text-xs font-semibold px-4">
              All
            </TabsTrigger>
            <TabsTrigger value="ACTIVE" className="rounded-xl text-xs font-semibold px-4">
              Active
            </TabsTrigger>
            <TabsTrigger value="PENDING" className="rounded-xl text-xs font-semibold px-4">
              Pending
            </TabsTrigger>
            <TabsTrigger value="DISABLED" className="rounded-xl text-xs font-semibold px-4">
              Disabled
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content View */}
      {loading ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <LogoLoader />
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center gap-3 shadow-xs my-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 border border-slate-200/60 flex items-center justify-center shadow-2xs">
            <PackageX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">No Products Found</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              There are no products available matching the selected category filter.
            </p>
          </div>
        </div>
      ) : (
        /* Products Responsive Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;