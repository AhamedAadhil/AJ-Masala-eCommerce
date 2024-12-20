import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminLayout from "./components/admin/AdminLayout";
import PrivateRoutes from "./components/PrivateRoutes";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import ProductsList from "./pages/admin/ProductsList";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Users from "./pages/admin/Users";
import CarouselList from "./pages/admin/CarouselList";
import CouponList from "./pages/admin/CouponList";
import OrderList from "./pages/admin/OrderList";
import UpdateOrder from "./pages/admin/UpdateOrder";

import SingleProduct from "./pages/SingleProduct";
import HomePage from "./pages/HomePage";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import Footer from "./components/Footer";
import AllProductsPage from "./pages/AllProductsPage";
import CartPage from "./pages/CartPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import PaymentFailurePage from "./components/PaymentFailurePage";
import AboutusPage from "./pages/AboutusPage";
import ContactusPage from "./pages/ContactusPage";
import NoInternet from "./components/NoInternet";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookieNotice from "./components/CookieNotice";

function App() {
  const { checkAuth, checkingAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <NoInternet />
      <CookieNotice />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/all" element={<AllProductsPage />} />
        <Route path="/about" element={<AboutusPage />} />
        <Route path="/support" element={<ContactusPage />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        {/* Customer Private Routes */}
        <Route element={<PrivateRoutes allowedRole="customer" />}>
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancel" element={<PaymentFailurePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoutes allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
            <Route path="users" element={<Users />} />
            <Route path="carousels" element={<CarouselList />} />
            <Route path="coupons" element={<CouponList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="update-order/:id" element={<UpdateOrder />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
