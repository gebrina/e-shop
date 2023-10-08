import { NavLink, Navigate } from "react-router-dom";
import { useEcomContext } from "../context/EcomContext";
import "./Dashboard.scss";
import { Card } from "primereact/card";

const Dashboard = () => {
  const { currentUser } = useEcomContext();
  console.log("current user", currentUser);
  if (!currentUser?.access_token) {
    return <Navigate to={"/dashboard/login"} />;
  }

  return (
    <main className="container-fluid text-center">
      <section className="center-items flex-wrap mt-4">
        <Card
          className="dashboard-card col-md-5 bg-light m-2"
          title={"Product Category"}
        >
          <div></div>
          <NavLink to={"/dashboard/product-categories"}>Manage</NavLink>
        </Card>

        <Card
          className="dashboard-card col-md-5 bg-light m-2"
          title={"Products"}
        >
          <div></div>
          <NavLink to={"/dashboard/products"}>Manage</NavLink>
        </Card>
        <Card className="dashboard-card col-md-5 bg-light m-2" title={"Users"}>
          <div></div>
          <NavLink to={"/dashboard/users"}>Manage</NavLink>
        </Card>
        <Card className="dashboard-card col-md-5 bg-light m-2" title={"Orders"}>
          <div></div>
          <NavLink to={"/dashboard/orders"}>Manage</NavLink>
        </Card>
      </section>
    </main>
  );
};

export default Dashboard;
