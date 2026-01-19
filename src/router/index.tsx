import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ListingPage from "@/pages/ListingPage";
import DetailPage from "@/pages/DetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ListingPage />,
      },
      {
        path: "character/:id",
        element: <DetailPage />,
      },
    ],
  },
]);
