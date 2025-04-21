import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { match } from "ts-pattern";
import { toast } from "@ui/ui-library/toast/toast-queue";
import {
  User as SupabaseUser,
  Session,
  createClient,
} from "@supabase/supabase-js";
import { queryClient } from "@ui/lib/api";

export type User = SupabaseUser & {
  user_metadata: {
    email: string;
    email_verified: boolean;
    first_name: string;
    last_name: string;
    business_name: string;
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SignUpData {
  email: string;
  password: string;
  username: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: SupabaseUser | null;
  session: Session | null;
}

export function useSignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending } = useMutation<
    AuthResponse,
    { message: string; code: string },
    SignUpData
  >({
    mutationFn: async (data: SignUpData) => {
      const { data: response, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      });
      if (error) throw error;
      return response;
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      const errMap: Record<string, string> = {};

      match(error.code)
        .with("user_already_exists", () => {
          errMap["email"] = "Cette adresse email est déjà utilisée";
        })
        .otherwise(() => {
          toast.add({
            title: "Erreur",
            description: error.message,
            type: "error",
            position: "top-left",
          });
        });

      setErrors(errMap);
    },
  });
  return { mutate, isPending, errors };
}

export function useLoginEmail() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending } = useMutation<
    AuthResponse,
    { message: string; code: string },
    LoginData
  >({
    mutationFn: async (data: LoginData) => {
      const { data: response, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password.trim(),
      });
      if (error) throw error;
      return response;
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      match(error.code)
        .with("invalid_credentials", () => {
          setErrors({ email: "Email ou mot de passe incorrect" });
        })
        .otherwise(() => {
          toast.add({
            title: "Erreur",
            description: error.message,
            type: "error",
            position: "top-left",
          });
        });
    },
  });
  return { mutate, isPending, errors };
}

export function useLoginGoogle() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login-with-oauth`,
        },
      });
      if (error) throw error;
      return data;
    },
  });
  return { loginWithGoogle: mutate };
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      queryClient.removeQueries();
    },
  });
}
