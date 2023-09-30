import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./dashboard/layout";
import { HomePage } from "./pages/home";
import { RegisterPage } from "./pages/user/register";
import { LoginPage } from "./pages/user/login";
const App = () => {
  return (
    <>
      <DashboardLayout />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/register" element={<RegisterPage />} />
          <Route path="/user/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
