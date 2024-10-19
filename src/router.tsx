import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/login/LoginPage";
import MainLayout from "@/pages/layouts/MainLayout";
import { RegisterPage } from "@/pages/login/RegisterPage";
import { CategoryPage } from "@/pages/category/CategoryPage";
import { PrivateRoutes } from "./pages/PrivateRoutes";
import { Groups } from "./pages/groups/Groups";
import { useEffect } from "react";
import { initializeAxios } from "./services/api";

function Element({ children }: { children: JSX.Element }) {  
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Axios with a callback function to redirect
    initializeAxios(() => navigate('/login'));
  }, [navigate]);
  
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
        path: "/grupos",
        element: <Element children={<Groups />} />
      },
      {
        path: "/categorias",
        element: <Element children={<CategoryPage />} />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);