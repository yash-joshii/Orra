import React from "react";
import UserTable from "@/components/admin/UserTable";

const Owners = () => {
  return (
    <div className="space-y-6">
      <UserTable role="OWNER" title="Device Owners" />
    </div>
  );
};

export default Owners;