import { Button } from "@ui/ui-library/button";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label, Input, TextField, FieldError } from "@ui/ui-library/field";
import { Form } from "@ui/ui-library/form";
import { Text } from "@ui/ui-library/text";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    // TODO: Implement password reset logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsPending(false);
  };

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-green-100 to-white dark:bg-gradient-to-br dark:from-[#0a1f0a] dark:via-[#051505] dark:to-black"
        onClick={() => navigate("/login")}
      >
        <div
          className={twMerge(
            "w-full max-w-lg p-8 bg-white dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl",
            "border border-emerald-200 dark:border-emerald-900/30",
            "shadow-xl"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Email envoyé
            </h1>
            <Text className="text-slate-600 dark:text-slate-400">
              Si un compte existe avec l&apos;adresse {email}, vous recevrez un
              email avec les instructions pour réinitialiser votre mot de passe.
            </Text>
            <Link to="/login">
              <Button
                className={twMerge(
                  "mt-4 bg-emerald-700 text-white",
                  "hover:bg-emerald-600"
                )}
              >
                Retour à la connexion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-green-100 to-white dark:bg-gradient-to-br dark:from-[#0a1f0a] dark:via-[#051505] dark:to-black"
      onClick={() => navigate("/login")}
    >
      <div
        className={twMerge(
          "w-full max-w-lg p-8 bg-white dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl",
          "border border-emerald-200 dark:border-emerald-900/30",
          "shadow-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Mot de passe oublié ?
            </h1>
            <Text className="text-slate-600 dark:text-slate-400">
              Entrez votre adresse email et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </Text>
          </div>

          <Form className="space-y-4" onSubmit={onSubmit}>
            <TextField isRequired name="email">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldError />
            </TextField>

            <Button
              className={twMerge(
                "w-full bg-emerald-700 text-white",
                "hover:bg-emerald-600"
              )}
              type="submit"
              isPending={isPending}
              pendingLabel="Envoi en cours..."
            >
              Réinitialiser le mot de passe
            </Button>
          </Form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            <a
              href="/login"
              className="text-emerald-600 hover:text-emerald-500 font-medium"
            >
              Retour à la connexion
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
