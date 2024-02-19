import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("dreamsumiai-user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
