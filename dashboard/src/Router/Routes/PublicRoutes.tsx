import { lazy } from "react";
import AdminLogin from "../../views/Auth/AdminLogin";

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
];

export default publicRoutes;
