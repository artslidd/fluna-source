import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { IS_DEV } from "@ui/config";

// Create axios instance with default config
export const api = axios.create({
  baseURL: IS_DEV ? "http://127.0.0.1:8000" : "https://api.Fluna.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Create React Query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
