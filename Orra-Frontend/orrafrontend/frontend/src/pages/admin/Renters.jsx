import React from "react";
import UserTable from "@/components/admin/UserTable";

const Renters = () => {
  return (
    <div className="space-y-6">
      <UserTable role="BUYER" title="Renters & Buyers" />
    </div>
  );
};

export default Renters;