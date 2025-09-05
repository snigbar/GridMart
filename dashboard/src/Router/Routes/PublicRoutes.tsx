import { lazy } from "react";
import AdminLogin from "../../views/Auth/AdminLogin";
import VerifyEmail from "../../views/Auth/VerifyEmail";

const Login = lazy(() => import("../../views/Auth/Login"));
const Register = lazy(() => import("../../views/Auth/Register"));

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
];

export default publicRoutes;
