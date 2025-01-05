import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./gui/styles/globals.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
