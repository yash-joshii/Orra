import React, { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Package, AlertCircle } from "lucide-react";

const EditListingModal = ({ isOpen, onClose, listing, onSave }) => {
  const [formData, setFormData] = useState({
    productName: "",
    dailyRate: "",
    available_from: "",
    available_to: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to format ISO/Date string into YYYY-MM-DD for <input type="date" />
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  // Populate form state whenever the listing changes or modal opens
  useEffect(() => {
    if (listing) {
      setFormData({
        productName: listing.productName || listing.title || "",
        dailyRate: listing.dailyRate || listing.pricePerDay || listing.rentalPrice || 0,
        available_from: formatDateForInput(listing.available_from || listing.availableFrom),
        available_to: formatDateForInput(listing.available_to || listing.availableTo),
      });
      setErrorMessage("");
    }
  }, [listing, isOpen]);

  if (!isOpen || !listing) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Frontend Basic Validation
    if (formData.available_from && formData.available_to) {
      if (new Date(formData.available_from) > new Date(formData.available_to)) {
        setErrorMessage("'Available From' date cannot be after 'Available To' date.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Pass the updated form data back to the parent container
      const productId = listing.productId || listing.id;
      await onSave(productId, {
        ...listing,
        productName: formData.productName,
        dailyRate: Number(formData.dailyRate),
        available_from: formData.available_from,
        available_to: formData.available_to,
      });

      onClose();
    } catch (err) {
      // Catch backend error (e.g., active booking restriction error)
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update listing. Active bookings may restrict edits.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-800">Edit Listing</h2>
            <p className="text-xs text-slate-500">Update rates and calendar availability</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Product Name
            </label>
            <div className="relative">
              <Package size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="e.g. Sony Alpha A7 IV"
              />
            </div>
          </div>

          {/* Daily Rate */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Daily Rate ($ / day)
            </label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                name="dailyRate"
                step="0.01"
                min="0"
                value={formData.dailyRate}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Availability Date Range */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Available From
              </label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  name="available_from"
                  value={formData.available_from}
                  onChange={handleChange}
                  className="w-full pl-9 pr-2 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Available To
              </label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  name="available_to"
                  value={formData.available_to}
                  onChange={handleChange}
                  className="w-full pl-9 pr-2 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditListingModal;