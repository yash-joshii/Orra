import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));       // CHANGED — uncommented
const AdminUsers = lazy(() => import("@/pages/admin/Users"));               // CHANGED — uncommented
const AdminOwners = lazy(() => import("@/pages/admin/Owners"));             // CHANGED — uncommented
const AdminRenters = lazy(() => import("@/pages/admin/Renters"));           // CHANGED — uncommented
const AdminProducts = lazy(() => import("@/pages/admin/Products"));         // CHANGED — uncommented
const AdminProductApproval = lazy(() => import("@/pages/admin/ProductApproval")); // CHANGED — uncommented

const AdminRoutes = (      // CHANGED — plain JSX const, not a function component
  <Route
    path="/admin"
    element={
      <ProtectedRoute role="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="owners" element={<AdminOwners />} />
    <Route path="renters" element={<AdminRenters />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="product-approval" element={<AdminProductApproval />} />
  </Route>
);

export default AdminRoutes;