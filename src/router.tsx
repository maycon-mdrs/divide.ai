import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/login/LoginPage";
import MainLayout from "@/pages/layouts/MainLayout";
import { RegisterPage } from "@/pages/login/RegisterPage";
import { CategoryPage } from "@/pages/category/CategoryPage";
import { PrivateRoutes } from "./pages/PrivateRoutes";
import { Groups } from "./pages/groups/Groups";

function Element({ children }: { children: JSX.Element }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}

export const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "*",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Element children={<HomePage />} />
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/grupos",
        element: <Element children={<Groups />} />
      }
    ],
  },
]);