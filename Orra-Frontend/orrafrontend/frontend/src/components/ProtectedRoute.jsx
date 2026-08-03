import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoLoader from "./common/LogoLoader";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, authLoading, user } = useSelector((state) => state.auth);  // CHECK — user must be here

  if (authLoading) {
    return <div><LogoLoader/></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && !user?.roles?.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;