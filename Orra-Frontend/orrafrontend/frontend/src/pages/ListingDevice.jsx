import { listdevice } from '@/api/ListingFormapi';
import Availability from '@/components/StepperFormForListing/Availability';
import BasicDetails from '@/components/StepperFormForListing/BasicDetails';
import PricingDetails from '@/components/StepperFormForListing/PricingDetails';
import ProductDetails from '@/components/StepperFormForListing/ProductDetails';
import SpeacificationInForm from '@/components/StepperFormForListing/SpeacificationInForm';
import UploadPhoto from '@/components/StepperFormForListing/UploadPhoto';


import React, { useState } from 'react'


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
    location:"",
    productcondition:"",
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


      console.log(formData);

      const data = new FormData();

      // Basic Details
      data.append(
        "basicDetails",
        JSON.stringify(formData.basicDetails)
      );

      data.append(
    "productDetails",
    JSON.stringify(formData.productDetails)
    );
      // Specifications
      data.append(
        "specifications",
        JSON.stringify(formData.specifications)
      );

      // Pricing
      data.append(
        "pricing",
        JSON.stringify(formData.pricing)
      );

      // Availability
      data.append(
        "availability",
        JSON.stringify(formData.availability)
      );

      // Images
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const response = await listdevice(data);

      console.log(response);

     // toast.success("Device Listed Successfully");
    } catch (error) {
      console.log(error);
      //toast.error("Failed");
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
}

export default ListingDevice