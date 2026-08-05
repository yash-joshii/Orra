import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Plus,
  ArrowLeft,
  ArrowRight,
  PackageCheck,
  Trash2,
  Info,
} from "lucide-react";

const SpecificationInForm = ({ setFormData, next, prev, formData }) => {
  const [items, setItems] = useState(
    formData?.specifications?.whatsIncluded || []
  );
  const [input, setInput] = useState("");

  // Keep parent formData updated whenever items change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        whatsIncluded: items,
      },
    }));
  }, [items, setFormData]);

  const addItem = () => {
    if (!input.trim()) return;
    setItems((prev) => [...prev, input.trim()]);
    setInput("");
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6">

      {/* Card Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
          <PackageCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">What's Included</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Specify everything included in the package so renters know what to expect.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Left Column: Input and List */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Package Accessories
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Add chargers, lenses, cables, or cases.
              </p>
            </div>
          </div>

          {/* Add Item Input Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. 2x Batteries & Charger"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem();
                }
              }}
              className="flex-1 h-11 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 text-slate-800 text-sm outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={addItem}
              className="h-11 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1 shrink-0 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Added Items List */}
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {items.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No accessories added yet. Type above and press Enter.
              </p>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/60 group hover:border-slate-300 transition-all"
                >
                  <span className="text-xs font-semibold text-slate-700 truncate pl-1">
                    {item}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Live Renter Preview */}
        <div className="space-y-3 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Live Preview
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              {items.length} Included
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3 min-h-[190px]">
            <p className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
              What's in the Box
            </p>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400 space-y-2">
                <PackageCheck className="w-8 h-8 opacity-30 text-slate-400" />
                <p className="text-xs font-medium">Your package items will appear here.</p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>

      {/* Navigation Action Buttons */}
      <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-100">
        <button
          type="button"
          onClick={prev}
          className="w-1/2 sm:w-auto px-6 h-12 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={next}
          className="w-1/2 sm:w-auto px-8 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default SpecificationInForm;