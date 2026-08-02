import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

// const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
// const AdminUsers = lazy(() => import("@/pages/admin/Users"));
// const AdminOwners = lazy(() => import("@/pages/admin/Owners"));
// const AdminRenters = lazy(() => import("@/pages/admin/Renters"));
// const AdminProducts = lazy(() => import("@/pages/admin/Products"));
// const AdminProductApproval = lazy(() => import("@/pages/admin/ProductApproval"));

const AdminRoutes = () => {
  return (
  <Route
    path="/admin"
    element={
      <ProtectedRoute role="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    {/* <Route index element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="owners" element={<AdminOwners />} />
    <Route path="renters" element={<AdminRenters />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="product-approval" element={<AdminProductApproval />} /> */}
  </Route>
  )
}

export default AdminRoutes