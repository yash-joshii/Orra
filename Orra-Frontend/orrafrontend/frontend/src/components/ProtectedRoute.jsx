import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.auth.user);

    if(!user){
        return <Navigate to="/login" replace />;
    }

     if (role && !user.roles?.includes(role)) {   // ADD — role check
    return <Navigate to="/" replace />;
  }
  
    return children;
};
export default ProtectedRoute;