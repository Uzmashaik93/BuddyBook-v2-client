import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/auth.context"; // <== IMPORT

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </StrictMode>
);
