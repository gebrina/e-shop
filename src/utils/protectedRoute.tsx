import { Navigate } from "react-router-dom";
import { useEcomContext } from "../context/EcomContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isDashboard, currentUser } = useEcomContext();
  if (isDashboard && !currentUser?.access_token)
    return <Navigate to={"/dashboard/login"} />;
  if (!isDashboard && !currentUser?.access_token)
    return <Navigate to={"/user/login"} />;

  return <>{children}</>;
};

export default ProtectedRoute;
