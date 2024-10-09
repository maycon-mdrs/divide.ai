import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/login/LoginPage";
import MainLayout from "@/pages/layouts/MainLayout";
import { RegisterPage } from "@/pages/login/RegisterPage";
import { PrivateRoutes } from "./pages/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: (
          <MainLayout>
            <HomePage />
          </MainLayout>
        )
      }
      ,
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);