import { NavLink, Navigate } from "react-router-dom";
import { useEcomContext } from "../context/EcomContext";
import "./Dashboard.scss";
import { Card } from "primereact/card";
import {
  FiBriefcase,
  FiPackage,
  FiShoppingCart,
  FiTruck,
  FiUserPlus,
} from "react-icons/fi";

const Dashboard = () => {
  const { currentUser } = useEcomContext();
  if (!currentUser?.access_token) {
    return <Navigate to={"/dashboard/login"} />;
  }

  const cardHeader = (title: string) => (
    <div className="fs-1">
      {title == "productsc" && <FiPackage />}
      {title === "products" && <FiBriefcase />}
      {title === "carts" && <FiShoppingCart />}
      {title === "orders" && <FiTruck />}
      {title === "users" && <FiUserPlus />}
    </div>
  );

  return (
    <main className="container  text-center">
      <section className="mt-4 center-items row">
        <Card
          header={() => cardHeader("productsc")}
          className="dashboard-card col-md-3 mt-4 bg-light m-2"
          title={"Product Category"}
        >
          <NavLink to={"/dashboard/product-categories"}>Manage</NavLink>
        </Card>

        <Card
          header={() => cardHeader("products")}
          className="dashboard-card col-md-3 mt-4 bg-light m-2"
          title={"Products"}
        >
          <NavLink to={"/dashboard/products"}>Manage</NavLink>
        </Card>
        <Card
          header={() => cardHeader("users")}
          className="dashboard-card col-md-3 mt-4 bg-light m-2"
          title={"Users"}
        >
          <NavLink to={"/dashboard/users"}>Manage</NavLink>
        </Card>
      </section>
      <section className="row">
        <div className="col-md-3 mt-4"></div>
        <Card
          header={() => cardHeader("orders")}
          className="dashboard-card col-md-3 mt-4 bg-light m-2"
          title={"Orders"}
        >
          <NavLink to={"/dashboard/orders"}>Manage</NavLink>
        </Card>

        <Card
          header={() => cardHeader("carts")}
          className="dashboard-card col-md-3 mt-4 bg-light m-2"
          title={"Cart"}
        >
          <NavLink to={"/dashboard/cart"}>Details</NavLink>
        </Card>
      </section>
    </main>
  );
};

export default Dashboard;
