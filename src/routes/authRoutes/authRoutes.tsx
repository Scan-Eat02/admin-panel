import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("../../pages/authentication/login"));
const Signup = lazy(() => import("../../pages/authentication/signup"));
const ForgetPassword = lazy(
  () => import("../../pages/authentication/forgetPassword")
);

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
