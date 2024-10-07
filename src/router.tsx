import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { LoginPage } from "@/pages/login/LoginPage";
import { PrivateRoutes } from "@/pages/PrivateRoutes";
import MainLayout from "@/pages/layouts/MainLayout";
import { Groups } from "./pages/groups/Groups";

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
        path: "/grupos",
        element: <Groups />,
      },
    ],
  },
]);