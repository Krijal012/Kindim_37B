import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategorySection from './pages/private/CategorySection';
import { ErrorPage } from './pages/public/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategorySection />} />
        <Route path="/products" element={<CategorySection />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;