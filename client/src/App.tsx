import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store";
import LoginPage from "./pages/login.page";
import NotFoundPage from "./pages/not-found.page";
import InvoicesPage from "./pages/invoices.page";
import BillsPage from "./pages/bills.page";

const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: LoginPage,
  },
  {
    path: "/bills",
    Component: BillsPage,
  },
  {
    path: "/invoices",
    Component: InvoicesPage,
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
