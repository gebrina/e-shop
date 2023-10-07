import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./product";
import { Order } from "./order";
import { AdminLogin, User } from "./user";
import Dashboard from ".";
import { useState } from "react";
import Sidbar from "../components/Sidbar";
import { FiSlack } from "react-icons/fi";
import { ProductCategory } from "./product-category";
import { useEcomContext } from "../context/EcomContext";
import { DashboradpageNotFound } from "./not-found";
import ProtectedRoute from "../utils/protectedRoute";
import LoggedInUserProfile from "./user/profile";
import { UserProfile } from "./profile";

const DashboardLayout = () => {
  const { isDashboard, currentUser } = useEcomContext();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      {isDashboard && (
        <div className="container-fluid px-5 h-50 py-3 border-info">
          <nav className="bg-light px-5 py-2">
            {currentUser?.access_token && (
              <div className="toggle-btn-container">
                <FiSlack onClick={toggleVisibility} style={{ fontSize: 20 }} />
              </div>
            )}
          </nav>
          <BrowserRouter>
            <UserProfile />
            <Sidbar visible={visible} setVisible={toggleVisibility} />
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/products"
                element={
                  <ProtectedRoute>
                    <Product />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/product-categories"
                element={
                  <ProtectedRoute>
                    <ProductCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/orders"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/users"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/user/profile"
                element={
                  <ProtectedRoute>
                    <LoggedInUserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard/login" element={<AdminLogin />} />
              <Route path="*" element={<DashboradpageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
