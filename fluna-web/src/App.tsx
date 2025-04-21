import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/signup";
import { ThemeProvider } from "./contexts/ThemeContext";
import { twMerge } from "tailwind-merge";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Overall } from "./pages/overall";
import { SessionProvider } from "./contexts/SessionContext";
import { OAuthSigninPage } from "./pages/oauth-signin";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Layout } from "./components/Layout";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export const App = () => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <Router>
          <div
            className={twMerge("min-h-screen bg-blue-200", "dark:bg-blue-950")}
          >
            <Routes>
              <Route path="/" element={<ProtectedRoute fallback="/login" />}>
                <Route
                  index
                  element={
                    <Layout>
                      <Overall />
                    </Layout>
                  }
                />
              </Route>
              <Route path="login-with-oauth" element={<OAuthSigninPage />} />
              <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <style>
              {`
                @keyframes slide {
                  0% { transform: translateX(-100vw); }
                  100% { transform: translateX(100vw); }
                }
                .animate-slide {
                  animation: slide 24s linear infinite;
                }
              `}
            </style>
          </div>
        </Router>
      </SessionProvider>
    </ThemeProvider>
  );
};
