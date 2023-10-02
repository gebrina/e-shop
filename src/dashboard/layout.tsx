import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./product";
import { Order } from "./order";
import { AdminLogin, User } from "./user";
import Dashboard from ".";
import { useState } from "react";
import Sidbar from "../components/Sidbar";
import { FiSlack } from "react-icons/fi";
import { ProductCategory } from "./product-category";
import { useEcomContext } from "../context/useEcomContext";
import { DashboradpageNotFound } from "./not-found";

const DashboardLayout = () => {
  const { isDashboard } = useEcomContext();
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      {isDashboard && (
        <div className="container-fluid px-5 bg-light h-50 py-3 border-info">
          <nav>
            <button
              onClick={toggleVisibility}
              className="btn btn-outline-secondary d-flex"
            >
              <FiSlack style={{ fontSize: 20 }} />
            </button>
          </nav>
          <BrowserRouter>
            <Sidbar visible={visible} setVisible={toggleVisibility} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/products" element={<Product />} />
              <Route
                path="/dashboard/product-categories"
                element={<ProductCategory />}
              />
              <Route path="/dashboard/orders" element={<Order />} />
              <Route path="/dashboard/users" element={<User />} />
              <Route path="/dashboard/user/login" element={<AdminLogin />} />
              <Route path="*" element={<DashboradpageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
