import { useEffect, useState } from "react";
// import { getProducts } from "@/api/adminApi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/admin/ProductCard";
import { getProducts } from "@/api/admin/adminApi";
import LogoLoader from "@/components/common/LogoLoader";

const Products = () => {

    const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const status = tab === "ALL" ? undefined : tab;
    getProducts(status)
      .then((res) => setProducts(res.data.content))
      .finally(() => setLoading(false));
  }, [tab]);


  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Products</h1>

      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="ACTIVE">Active</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="DISABLED">Disabled</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div><LogoLoader/></div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products