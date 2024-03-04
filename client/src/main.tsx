import React from "react";
import ReactDOM from "react-dom/client";
import axe from "react-axe";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.VITE_APP_MODE !== "production") {
  axe(React, ReactDOM, 1000);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
