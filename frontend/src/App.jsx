import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import { useUserStore } from "./stores/useUserStore";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import AdminLayout from "./components/admin/AdminLayout";
import ProductsList from "./pages/admin/ProductsList";
import SingleProduct from "./components/SingleProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SingleProduct" element={<SingleProduct />} />

        {/* Admin Routes */}
        {user?.role === "admin" ? (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
          </Route>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
