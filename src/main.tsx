import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { EcomContextProvider } from "./context/EcomContext";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <EcomContextProvider>
        <App />
      </EcomContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
