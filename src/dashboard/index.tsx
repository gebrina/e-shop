import { NavLink, Navigate } from "react-router-dom";
import { useEcomContext } from "../context/EcomContext";
import { jwtDecode } from "../utils";
import "./Dashboard.scss";
import { FiUser } from "react-icons/fi";

const Dashboard = () => {
  const { currentUser } = useEcomContext();
  const decodedJwt: any = jwtDecode();
  const loggedInUser = decodedJwt?.user;

  if (!currentUser?.access_token) {
    return <Navigate to={"/dashboard/login"} />;
  }

  return (
    <main className="container-fluid">
      <section className="profile">
        <div className="profile-icon">
          <FiUser />
        </div>
        <ul>
          <li>{loggedInUser?.username}</li>
          <li>{loggedInUser?.email}</li>
          <li>
            <NavLink to={"/user"}>Update Profile</NavLink>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;
