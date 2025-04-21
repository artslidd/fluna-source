import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@ui/contexts/SessionContext";

export const OAuthSigninPage = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  useEffect(() => {
    const interval = setInterval(() => {
      if (session) {
        navigate("/");
      }
    }, 100);
    return () => clearInterval(interval);
  }, [navigate, session]);
  return <></>;
};
