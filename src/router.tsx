import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/login/LoginPage";
import { PrivateRoutes } from "@/pages/PrivateRoutes";
import MainLayout from "@/pages/layouts/MainLayout";

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
    ],
  },
]);