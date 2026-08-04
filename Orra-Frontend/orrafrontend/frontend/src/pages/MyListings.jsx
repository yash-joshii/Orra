import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/common/ListingCard";
import EditListingModal from "../components/common/EditListingModal";
// import { getMyListings, updateProduct } from "./apiService"; // update path as needed
// import { setProducts, setLoading, setError } from "./productSlice"; // update path as needed
import { Loader2, AlertCircle, PackageX } from "lucide-react";
import { getMyListings, updateProduct } from "@/api/listingApi";
import { setError, setLoading, setProducts } from "@/redux/slices/productslices";

const MyListings = ({ activeBookings = [] }) => {
  const dispatch = useDispatch();
  
  // Select state from Redux
  const { products, loading, error } = useSelector((state) => state.products);

  // Modal State
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch listings on mount
  useEffect(() => {
    const fetchListings = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getMyListings();
        dispatch(setProducts(response.data || []));
      } catch (err) {
        dispatch(setError(err?.response?.data?.message || "Failed to fetch listings"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchListings();
  }, [dispatch]);

  // Open Edit Modal
  const handleEditClick = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  // Close Edit Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  // Save changes from Modal to Backend & Redux
  const handleSaveListing = async (productId, updatedPayload) => {
  const response = await updateProduct(productId, updatedPayload);
  const updatedProduct = response.data;

  const updatedList = products.map((item) => {
    const itemId = item.productId || item.id;
    return Number(itemId) === Number(productId) ? { ...item, ...updatedProduct } : item;
  });

  dispatch(setProducts(updatedList));
};

  // Handle Delete listing (Placeholder / API connection)
  const handleDeleteClick = async (listing) => {
    const productId = listing.productId || listing.id;
    if (window.confirm(`Are you sure you want to delete "${listing.productName || listing.title}"?`)) {
      try {
        // await deleteProductApi(productId);
        const filteredList = products.filter(
          (item) => (item.productId || item.id) !== productId
        );
        dispatch(setProducts(filteredList));
      } catch (err) {
        alert(err?.response?.data?.message || "Failed to delete listing.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-slate-500">
        <Loader2 size={32} className="animate-spin text-indigo-600 mb-2" />
        <p className="text-xs font-semibold">Loading your listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 max-w-lg mx-auto my-6">
        <AlertCircle size={18} className="shrink-0 text-rose-500" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">My Listings</h1>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Total: {products.length}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <PackageX size={48} className="mb-3 text-slate-300" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-slate-600">No listings found</p>
          <p className="text-xs text-slate-400 mt-1">You haven't created any product listings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((listing) => (
            <ListingCard
              key={listing.productId || listing.id}
              listing={listing}
              activeBookings={activeBookings}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Edit Form Modal */}
      <EditListingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        listing={selectedListing}
        onSave={handleSaveListing}
      />
    </div>
  );
};

export default MyListings;