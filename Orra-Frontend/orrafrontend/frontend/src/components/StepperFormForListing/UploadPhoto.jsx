import React from "react";
import {
  ImagePlus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Camera,
  Star,
} from "lucide-react";

const UploadPhoto = ({ prev, next, formData, setFormData }) => {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadedImages = await Promise.all(
      files.map(async (file, index) => ({
        imageBase64: await convertToBase64(file),
        isCover: (formData.images?.length || 0) + index === 0,
        displayOrder: (formData.images?.length || 0) + index,
      }))
    );

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...uploadedImages],
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = (prev.images || [])
        .filter((_, i) => i !== indexToRemove)
        .map((img, i) => ({
          ...img,
          isCover: i === 0,
          displayOrder: i,
        }));

      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6">

      {/* Card Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Camera className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Upload Media</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Add high-quality photos to make your listing stand out to renters.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Upload Dropzone */}
        <label className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col justify-center items-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/20 transition-all group">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform">
            <ImagePlus className="w-6 h-6" />
          </div>

          <p className="mt-3 text-sm font-bold text-slate-800">
            Click or drag photos here
          </p>

          <p className="text-xs text-slate-400 mt-1 font-medium">
            JPG, PNG, WEBP supported
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Preview Grid */}
        {formData.images?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Uploaded Photos ({formData.images.length})</span>
              <span className="text-[11px] font-medium text-slate-400">
                First image is your cover photo
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden border border-slate-200/80 group aspect-square bg-slate-100"
                >
                  <img
                    src={image.imageBase64}
                    alt={`Device preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Cover Photo Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>Cover</span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-xl bg-rose-500/90 text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 active:scale-90 cursor-pointer shadow-xs"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
          disabled={!formData.images || formData.images.length === 0}
          className="w-1/2 sm:w-auto px-8 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default UploadPhoto;