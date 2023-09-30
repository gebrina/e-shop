import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./dashboard/product";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
