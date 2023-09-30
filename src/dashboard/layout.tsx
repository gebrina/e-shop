import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./product";
import { Order } from "./order";
import { User } from "./user";
import Navbar from "./navbar/Navbar";
const DashboardLayout = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Product />} />
        <Route path="/dashboard/orders" element={<Order />} />
        <Route path="dashbaord/users" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default DashboardLayout;
