import { Navigate } from "react-router-dom";
import { useEcomContext } from "../context/EcomContext";

const Dashboard = () => {
  const { currentUser } = useEcomContext();
  console.log(Boolean(currentUser?.access_token));
  if (!currentUser?.access_token) {
    return <Navigate to={"/dashboard/login"} />;
  } else {
    console.log("not navigate");
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
