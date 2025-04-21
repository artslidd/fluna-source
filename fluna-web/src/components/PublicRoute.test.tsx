import { screen, waitFor } from "@testing-library/react";
import { PublicRoute } from "@ui/components/PublicRoute";
import { Routes, Route } from "react-router-dom";
import { SessionTestProvider } from "@ui/contexts/SessionContext";
import { renderWithRouter } from "@ui/utils/testHelpers";

describe("PublicRoute", () => {
  it("shows loading state initially", () => {
    renderWithRouter(
      <SessionTestProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </SessionTestProvider>,
      { route: "/login" }
    );

    // Check if loading spinner is present
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("redirect to home when user is authenticated", async () => {
    renderWithRouter(
      <SessionTestProvider
        testUser={{
          id: "123",
          app_metadata: {},
          user_metadata: {
            full_name: "Test User",
            email: "test@example.com",
            email_verified: true,
            first_name: "Test",
            last_name: "User",
            business_name: "Test Business",
          },
          aud: "authenticated",
          created_at: new Date().toISOString(),
        }}
      >
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </SessionTestProvider>,
      { route: "/login" }
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
  });

  it("renders public content when user is not authenticated", async () => {
    renderWithRouter(
      <SessionTestProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </SessionTestProvider>,
      { route: "/login" }
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });
});
