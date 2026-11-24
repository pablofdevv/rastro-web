import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { NotFoundPage } from "../components/layout/NotFoundPage";
import { ListingDetailPage } from "../features/listings/ListingDetailPage";
import { ListingsPage } from "../features/listings/ListingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ListingsPage /> },
      { path: "listings/:id", element: <ListingDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
