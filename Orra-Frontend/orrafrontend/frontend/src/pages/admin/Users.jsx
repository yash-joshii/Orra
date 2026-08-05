import React from "react";
import UserTable from "@/components/admin/UserTable";

const Users = () => {
  // role={undefined} means UserTable will fetch all users regardless of role (Owner/Buyer)
  return (
    <div className="space-y-6">
      <UserTable role={undefined} title="Global User Base" />
    </div>
  );
};

export default Users;