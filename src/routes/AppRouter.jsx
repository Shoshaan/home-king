import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../features/products/pages/ProductsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentSuccess } from "../pages/PaymentSuccess";
import { PaymentFailed } from "../pages/PaymentFaild";
import { ScrollToTop } from "../features/products/components/ScrollToTop";
import { DashboardPage } from "../features/dashboard/Pages/DashboardPage";
import { OrdersPage } from "../features/dashboard/Pages/OrdersPage";



export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failed" element={<PaymentFailed />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
