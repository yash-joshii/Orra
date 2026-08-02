import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, authLoading } = useSelector((state) => state.auth);

    if (authLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

//      if (role && !user.roles?.includes(role)) {   // ADD — role check
//     return <Navigate to="/" replace />;
//   }
  
    return children;
};

export default ProtectedRoute;