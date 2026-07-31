import { ImagePlus, Info, Trash2 } from 'lucide-react';
import React from 'react'

const UploadPhoto = ({prev, next, formData, setFormData}) => {
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

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex justify-center pt-16">
      <div className="w-full max-w-[520px]">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-[#0F172A]">
          List your device
        </h1>

        <p className="mt-2 text-gray-500 text-sm">
          Upload clear photos of your device.
        </p>

        {/* Stepper */}

        <div className="flex gap-2 mt-7 mb-8">
          <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
          <div className="h-1 flex-1 bg-[#5B4CF6] rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">

          <div className="flex items-center gap-2 mb-6">
            <Info size={18} className="text-[#5B4CF6]" />

            <h2 className="text-xl font-semibold">
              Upload Photos
            </h2>
          </div>

          {/* Upload */}

          <label className="border-2 border-dashed border-gray-300 rounded-2xl h-48 flex flex-col justify-center items-center cursor-pointer hover:border-[#5B4CF6] transition">

            <ImagePlus size={42} className="text-[#5B4CF6]" />

            <p className="mt-3 font-medium">
              Click to upload photos
            </p>

            <p className="text-sm text-gray-500">
              JPG, PNG, WEBP
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {/* Preview */}

          {formData.images?.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-6">

              {formData.images.map((image, index) => (

                <div
                  key={index}
                  className="relative"
                >

                  <img
                    src={image.imageBase64}
                    alt=""
                    className="h-28 w-full object-cover rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>

              ))}

            </div>
          )}

          {/* Buttons */}

          <div className="flex justify-between mt-8">

            <button
              onClick={prev}
              className="w-36 h-12 border rounded-xl"
            >
              Previous
            </button>

            <button
              onClick={next}
              className="w-36 h-12 rounded-xl bg-gradient-to-r from-[#6757FF] to-[#5B4CF6] text-white"
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default UploadPhoto