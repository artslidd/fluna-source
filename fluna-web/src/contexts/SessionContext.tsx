import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../hooks/auth";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
      }
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const SessionTestProvider = ({
  children,
  testUser,
}: Props & { testUser?: User }) => {
  const session = testUser
    ? {
        user: testUser,
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        expires_in: 3600,
        token_type: "Bearer",
      }
    : null;
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
