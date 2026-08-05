import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Check,
  Layers,
  FileText,
  PackagePlus,
  ImagePlus,
  Tag,
  Calendar,
  Sparkles,
} from "lucide-react";
import { listdevice } from "@/api/ListingFormapi";

import BasicDetails from "@/components/StepperFormForListing/BasicDetails";
import ProductDetails from "@/components/StepperFormForListing/ProductDetails";
import SpeacificationInForm from "@/components/StepperFormForListing/SpeacificationInForm";
import UploadPhoto from "@/components/StepperFormForListing/UploadPhoto";
import PricingDetails from "@/components/StepperFormForListing/PricingDetails";
import Availability from "@/components/StepperFormForListing/Availability";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { id: 1, label: "Basic Info", icon: Layers },
  { id: 2, label: "Product Info", icon: FileText },
  { id: 3, label: "In The Box", icon: PackagePlus },
  { id: 4, label: "Photos", icon: ImagePlus },
  { id: 5, label: "Pricing", icon: Tag },
  { id: 6, label: "Availability", icon: Calendar },
];

const ListingDevice = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    basicDetails: {
      category: "",
      brand: "",
      model: "",
      productName: "",
      description: "",
    },
    productDetails: {
      purchaseYear: "",
      serialorimei: "",
      location: "",
    },
    specifications: {
      whatsIncluded: [],
      preview: "",
    },
    images: [],
    pricing: {
      purchasePrice: "",
      securityDeposit: "",
      rentalPrice: "",
    },
    availability: {
      availableFrom: today,
      availableTo: "",
      minimumRentalDays: "",
      maximumRentalDays: "",
    },
  });

  // Step-by-Step Input Validation
  const validateStep = (step) => {
    switch (step) {
      case 1: {
        const { category, brand, productName } = formData.basicDetails;
        if (!category?.trim()) {
          toast.error("Please select a device category.");
          return false;
        }
        if (!brand?.trim()) {
          toast.error("Please enter the brand name.");
          return false;
        }
        if (!productName?.trim()) {
          toast.error("Please enter a product name.");
          return false;
        }
        return true;
      }

      case 2: {
        const { location } = formData.productDetails;
        if (!location?.trim()) {
          toast.error("Please specify your pickup location.");
          return false;
        }
        return true;
      }

      case 3: {
        if (
          !formData.specifications.whatsIncluded ||
          formData.specifications.whatsIncluded.length === 0
        ) {
          toast.error("Please add at least one item included in the package.");
          return false;
        }
        return true;
      }

      case 4: {
        if (!formData.images || formData.images.length === 0) {
          toast.error("Please upload at least one photo of your device.");
          return false;
        }
        return true;
      }

      case 5: {
        const { rentalPrice } = formData.pricing;
        if (!rentalPrice || Number(rentalPrice) <= 0) {
          toast.error("Please enter a valid daily rental rate.");
          return false;
        }
        return true;
      }

      case 6: {
        const {
          availableFrom,
          availableTo,
          minimumRentalDays,
          maximumRentalDays,
        } = formData.availability;

        if (!availableFrom) {
          toast.error("Please select an 'Available From' date.");
          return false;
        }
        if (availableTo && availableTo < availableFrom) {
          toast.error(
            "'Available Until' date cannot be earlier than 'Available From' date."
          );
          return false;
        }
        if (
          minimumRentalDays &&
          maximumRentalDays &&
          Number(minimumRentalDays) > Number(maximumRentalDays)
        ) {
          toast.error("Minimum rental days cannot exceed maximum rental days.");
          return false;
        }
        return true;
      }

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (targetStep) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
    } else if (targetStep > currentStep) {
      for (let s = currentStep; s < targetStep; s++) {
        if (!validateStep(s)) return;
      }
      setCurrentStep(targetStep);
    }
  };

  const handleSubmit = async (e) => {
       if (e?.preventDefault) {
      e.preventDefault();
    }

    if (!validateStep(6)) return;

    try {
      const toNumber = (val) =>
        val === "" || val === null || val === undefined ? null : Number(val);

      const dto = {
        product: {
          productName: formData.basicDetails.productName || null,
          category: formData.basicDetails.category || null,
          brand: formData.basicDetails.brand || null,
          model: formData.basicDetails.model || null,
          description: formData.basicDetails.description || null,

          purchaseYear: toNumber(formData.productDetails.purchaseYear),
          serialOrImei: formData.productDetails.serialorimei?.trim() || null,
          location: formData.productDetails.location || null,

          purchasePrice: toNumber(formData.pricing.purchasePrice),
          securityDeposit: toNumber(formData.pricing.securityDeposit),
          dailyRate: toNumber(formData.pricing.rentalPrice),

          availableFrom: formData.availability.availableFrom || null,
          availableTo: formData.availability.availableTo || null,

          minimumRentalDays: toNumber(formData.availability.minimumRentalDays),
          maximumRentalDays: toNumber(formData.availability.maximumRentalDays),

          productspec: formData.specifications.whatsIncluded || [],
        },

        images: formData.images.map((img) => img.imageBase64),
      };

      console.log("FORM DATA:", formData);
      console.log("DTO PAYLOAD:", JSON.stringify(dto, null, 2));

      const response = await listdevice(dto);
      console.log("API RESPONSE:", response);

      toast.success("Device successfully listed for rent!");
      navigate("/my-listings");
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      toast.error("Failed to add product. Please check your data.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/70 pb-16">
      {/* Top Banner Header with Stepper Progress */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">
                  List Your Device
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Complete 6 easy steps to start earning
                </p>
              </div>
            </div>

            <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Step {currentStep} of 6
            </div>
          </div>

          {/* Stepper Navigation Bar */}
          <div className="grid grid-cols-6 gap-1.5 sm:gap-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                      : isCompleted
                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-700 hover:bg-emerald-100/80"
                      : "bg-slate-50 border-slate-200/60 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <span className="text-[10px] sm:text-xs font-bold tracking-tight truncate hidden md:inline">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Step Component Container */}
      <main className="max-w-4xl mx-auto pt-6 px-4">
        {currentStep === 1 && (
          <BasicDetails
            next={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === 2 && (
          <ProductDetails
            next={handleNext}
            prev={handlePrev}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === 3 && (
          <SpeacificationInForm
            next={handleNext}
            prev={handlePrev}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === 4 && (
          <UploadPhoto
            next={handleNext}
            prev={handlePrev}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === 5 && (
          <PricingDetails
            next={handleNext}
            prev={handlePrev}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === 6 && (
          <Availability
            prev={handlePrev}
            formData={formData}
            setFormData={setFormData}
            next={handleSubmit}
          />
        )}
      </main>
    </div>
  );
};

export default ListingDevice;