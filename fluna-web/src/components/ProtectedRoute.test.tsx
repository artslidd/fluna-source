import { screen, waitFor } from "@testing-library/react";
import { ProtectedRoute } from "@ui/components/ProtectedRoute";
import { SessionTestProvider } from "@ui/contexts/SessionContext";
import { renderWithRouter } from "@ui/utils/testHelpers";
import { Routes, Route } from "react-router-dom";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.setItem("Fluna-has-seen-landing-page", "true");
  });
  afterEach(() => {
    localStorage.removeItem("Fluna-has-seen-landing-page");
  });

  it("shows loading state initially", () => {
    renderWithRouter(
      <SessionTestProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </SessionTestProvider>,
      { route: "/" }
    );

    // Check if loading spinner is present
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("redirects to login when user is not authenticated", async () => {
    renderWithRouter(
      <SessionTestProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </SessionTestProvider>,
      { route: "/" }
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("redirects to landing page for first-time users", async () => {
    // Set up first-time user scenario
    localStorage.removeItem("Fluna-has-seen-landing-page");

    renderWithRouter(
      <SessionTestProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/landing" element={<div>Landing Page</div>} />
        </Routes>
      </SessionTestProvider>,
      { route: "/" }
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText("Landing Page")).toBeInTheDocument();
    });
  });

  it("renders protected content when user is authenticated", async () => {
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
          email: "test@example.com",
          role: "authenticated",
          updated_at: new Date().toISOString(),
        }}
      >
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </SessionTestProvider>,
      { route: "/" }
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });
  });

  it("uses custom fallback route when provided", async () => {
    renderWithRouter(
      <SessionTestProvider>
        <Routes>
          <Route element={<ProtectedRoute fallback="/custom-login" />}>
            <Route path="/" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/custom-login" element={<div>Custom Login Page</div>} />
          <Route path="/landing" element={<div>Landing Page</div>} />
        </Routes>
      </SessionTestProvider>,
      { route: "/" }
    );

    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByText("Custom Login Page")).toBeInTheDocument();
    });
  });
});
