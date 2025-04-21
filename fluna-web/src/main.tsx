import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/api";
import { GlobalToastRegion } from "./ui-library/toast/toast-region";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalToastRegion />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
