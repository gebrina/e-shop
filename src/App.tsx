import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./dashboard/layout";
import { HomePage } from "./pages/home";
import { RegisterPage } from "./pages/user/register";
import { LoginPage } from "./pages/user/login";
import { PageNotFound } from "./pages/notfound";
import Navbar from "./components/navbar/Navbar";
import { useEcomContext } from "./context/EcomContext";
import { ProductDetail, ProductsPage } from "./pages/product";
import { CartCheckout } from "./pages/cart/checkout";

const App = () => {
  const { isDashboard } = useEcomContext();

  return (
    <>
      <DashboardLayout />
      <BrowserRouter>
        {!isDashboard && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart/checkout" element={<CartCheckout />} />
          {!isDashboard && <Route path="*" element={<PageNotFound />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
