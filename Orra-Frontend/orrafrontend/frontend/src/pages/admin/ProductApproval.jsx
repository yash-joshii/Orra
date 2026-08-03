import { useEffect, useState } from "react";
// import { getProducts, approveProduct, rejectProduct } from "@/api/adminApi";
import ProductCard from "@/components/admin/ProductCard";
import { Button } from "@/components/ui/button";
import { approveProduct, getProducts, rejectProduct } from "@/api/admin/adminApi";
import LogoLoader from "@/components/common/LogoLoader";

const ProductApproval = () => {
     const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = () => {
    setLoading(true);
    getProducts("PENDING")
      .then((res) => setProducts(res.data.content))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    await approveProduct(id);
    fetchPending();
  };

  const handleReject = async (id) => {
    await rejectProduct(id);
    fetchPending();
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Product Approval</h1>

      {loading ? (
        <div><LogoLoader/></div>
      ) : products.length === 0 ? (
        <div className="text-gray-500">No products pending approval.</div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.productId}
              product={p}
              actions={
                <>
                  <Button size="sm" onClick={() => handleApprove(p.productId)}>
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(p.productId)}
                  >
                    Reject
                  </Button>
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductApproval