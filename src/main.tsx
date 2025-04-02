import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth.context"; // <== IMPORT

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  </StrictMode>
);
