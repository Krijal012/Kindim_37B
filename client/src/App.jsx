import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/private/CartPage";
import CategorySection from "./pages/private/CategorySection";
import { ErrorPage } from "./pages/public/ErrorPage"; // Add this import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategorySection />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;