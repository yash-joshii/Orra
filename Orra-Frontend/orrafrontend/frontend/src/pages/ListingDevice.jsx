import { listdevice } from "@/api/ListingFormapi";
import Availability from "@/components/StepperFormForListing/Availability";
import BasicDetails from "@/components/StepperFormForListing/BasicDetails";
import PricingDetails from "@/components/StepperFormForListing/PricingDetails";
import ProductDetails from "@/components/StepperFormForListing/ProductDetails";
import SpeacificationInForm from "@/components/StepperFormForListing/SpeacificationInForm";
import UploadPhoto from "@/components/StepperFormForListing/UploadPhoto";

import React, { useState } from "react";
import { toast } from "react-toastify";

const ListingDevice = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
      // productcondition: "",
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
      availableFrom: "",
      availableTo: "",
      minimumRentalDays: "",
      maximumRentalDays: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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

          availableFrom: formData.availability.availableFrom
            ? `${formData.availability.availableFrom}T00:00:00`
            : null,

          availableTo: formData.availability.availableTo
            ? `${formData.availability.availableTo}T00:00:00`
            : null,

          minimumRentalDays: toNumber(formData.availability.minimumRentalDays),
          maximumRentalDays: toNumber(formData.availability.maximumRentalDays),

          productspec: formData.specifications.whatsIncluded || [],
        },

        images: formData.images.map((img) => img.imageBase64),
      };

      console.log("FORM DATA");
      console.log(formData);

      console.log("DTO");
      console.log(JSON.stringify(dto, null, 2));

      const response = await listdevice(dto);
      console.log(response);
      toast.success("Product is successfully added")
    } catch (error) {
      console.log(error);
      toast.error("Product is failed to add")
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <BasicDetails
          next={() => setCurrentStep(2)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 2 && (
        <ProductDetails
          next={() => setCurrentStep(3)}
          prev={() => setCurrentStep(1)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 3 && (
        <SpeacificationInForm
          next={() => setCurrentStep(4)}
          prev={() => setCurrentStep(2)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 4 && (
        <UploadPhoto
          next={() => setCurrentStep(5)}
          prev={() => setCurrentStep(3)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 5 && (
        <PricingDetails
          next={() => setCurrentStep(6)}
          prev={() => setCurrentStep(4)}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {currentStep === 6 && (
        <Availability
          prev={() => setCurrentStep(5)}
          formData={formData}
          setFormData={setFormData}
          next={handleSubmit}
        />
      )}
    </>
  );
};

export default ListingDevice;
