import React from "react";
import { Provider } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import store from "./store";
import LoginPage from "./pages/login.page";
import NotFoundPage from "./pages/not-found.page";
import InvoicesPage from "./pages/invoices.page";
import BillsPage from "./pages/bills.page";
import RegisterPage from "./pages/register.page.test";
import withPublicRoute from "./routes/public.route";
import withPrivateRoute from "./routes/private.route";

const router = createBrowserRouter([
  {
    path: "/",
    Component: (): JSX.Element => <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: () => withPublicRoute(LoginPage),
  },
  {
    path: "/register",
    Component: () => withPublicRoute(RegisterPage),
  },
  {
    path: "/bills",
    Component: () => withPrivateRoute(BillsPage),
  },
  {
    path: "/invoices",
    Component: () => withPrivateRoute(InvoicesPage),
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
