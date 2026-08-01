import { CheckCircle2, X } from "lucide-react";
import React, { useEffect, useState } from "react";


const SpeacificationInForm = ({setFormData, next, prev, formData}) => {
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
      <>
     <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Side */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            What's Included
          </h2>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="w-11 h-11 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. Camera Body"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addItem();
                  }
                }}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
              />

              <button
                type="button"
                onClick={addItem}
                className="w-11 h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xl"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Preview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Preview
          </h2>

          <div className="border rounded-xl p-6 bg-gray-50">
            <h3 className="font-semibold text-lg mb-4">
              What's Included
            </h3>

            {items.length === 0 ? (
              <p className="text-gray-500">
                No items added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      className="text-green-600"
                      size={18}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prev}
          className="w-[150px] h-12 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={next}
          className="w-[150px] h-12 rounded-xl bg-gradient-to-r from-[#6757FF] to-[#5B4CF6] text-white font-medium hover:opacity-95 transition"
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default SpeacificationInForm;