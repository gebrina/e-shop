import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./product";
import { Order } from "./order";
import { User } from "./user";
import Dashboard from ".";
import { useState } from "react";
import Sidbar from "../components/Sidbar";
import { FiSlack } from "react-icons/fi";
import { Button } from "primereact/button";
const DashboardLayout = () => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
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
          <Route path="/dashboard/orders" element={<Order />} />
          <Route path="/dashbaord/users" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default DashboardLayout;
