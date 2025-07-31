import React from "react";
import ReactDOM from "react-dom/client";
import App from "./modules/App";
import "./style.css";

// PUBLIC_INTERFACE
/**
 * Entrypoint for Notes App (Vite+React)
 * All global providers defined here
 */
ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
