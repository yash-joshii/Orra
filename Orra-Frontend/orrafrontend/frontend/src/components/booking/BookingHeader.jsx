import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BookingHeader = () => {
  return (
    <div className="w-full space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList className="text-xs sm:text-sm font-medium text-slate-500">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="hover:text-indigo-600 transition-colors">
              Browse Devices
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold text-slate-900">
              Request to Book
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title & Subtitle */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Request to Book
        </h1>
        <p className="text-sm sm:text-base font-medium text-slate-500 max-w-2xl leading-relaxed">
          Review your rental dates and request approval from the item owner.
        </p>
      </div>
    </div>
  );
};

export default BookingHeader;