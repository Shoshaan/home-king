import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
