import { render, RenderResult, waitFor } from "@testing-library/react";
import { SessionTestProvider } from "@ui/contexts/SessionContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@ui/contexts/ThemeContext";
import { User } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";
import { queryClient } from "@ui/lib/api";
import { QueryClientProvider } from "@tanstack/react-query";

export const renderWithRouter = (ui: React.ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

export const renderWithProviders = (
  ui: React.ReactNode,
  opts: { user?: User } = {}
): RenderResult => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <SessionTestProvider
            testUser={
              opts.user ?? {
                id: "123",
                app_metadata: {},
                aud: "test",
                created_at: "2021-01-01",
                user_metadata: {
                  first_name: "John",
                  last_name: "Doe",
                  avatar_url: "https://example.com/avatar.jpg",
                  full_name: "John Doe",
                },
              }
            }
          >
            {ui}
          </SessionTestProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export const waitForGridToBeInTheDOM = (): Promise<void> => {
  return waitFor(() => {
    expect(document.querySelector(".ag-root-wrapper")).toBeInTheDocument();
  });
};
