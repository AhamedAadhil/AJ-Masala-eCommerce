/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const PrivateRoutes = ({ allowedRole }) => {
  const { user } = useUserStore();

  return user?.role === allowedRole ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
