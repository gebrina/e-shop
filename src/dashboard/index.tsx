import { Navigate } from "react-router-dom";
import { useEcomContext } from "../context/EcomContext";
import { jwtDecode } from "../utils";
import "./Dashboard.scss";
const Dashboard = () => {
  const { currentUser } = useEcomContext();

  const decodedJwt: any = jwtDecode();
  const loggedInUser = decodedJwt?.user;

  if (!currentUser?.access_token) {
    return <Navigate to={"/dashboard/login"} />;
  }

  return <main className="container-fluid"></main>;
};

export default Dashboard;
