// src/hooks/useMyListings.js
import { getMyListings } from "@/api/listingApi";
import { setError, setLoading, setProducts } from "@/redux/slices/productslices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useMyListings = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const fetchListings = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMyListings();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];
      dispatch(setProducts(data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchListings();
  }, [dispatch]);

  return {
    products,
    loading,
    error,
    refetch: fetchListings,
  };
};

export default useMyListings;