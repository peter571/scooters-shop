import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ScootersProvider } from "./context/ScootersContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ScootersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ScootersProvider>
);
