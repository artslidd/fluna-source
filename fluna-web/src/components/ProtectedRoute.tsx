import { useEffect, useState } from "react";
import { useSession } from "../contexts/SessionContext";
import { Navigate, Outlet } from "react-router-dom";
import { match } from "ts-pattern";

interface ProtectedRouteProps {
  fallback?: string;
}

export const ProtectedRoute = ({ fallback }: ProtectedRouteProps) => {
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [session, fallback]);

  let status:
    | "loading"
    | "should-land-user"
    | "should-redirect"
    | "should-pass" = "loading";
  // const isFirstTimeUser =
  //   localStorage.getItem("Fluna-has-seen-landing-page") === null;
  if (isLoading) {
    status = "loading";
    // } else if (!session?.user && isFirstTimeUser) {
    // status = "should-land-user";
  } else if (!session?.user) {
    status = "should-redirect";
  } else {
    status = "should-pass";
  }

  return (
    <>
      {match(status)
        .with("loading", () => (
          <div>
            <div className="flex items-center justify-center min-h-screen">
              <div
                role="status"
                className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"
              />
            </div>
          </div>
        ))
        // .with("should-land-user", () => <Navigate to="/landing" replace />)
        .with("should-redirect", () => (
          <Navigate to={fallback ?? "/login"} replace />
        ))
        .with("should-pass", () => <Outlet />)
        .exhaustive()}
    </>
  );
};
