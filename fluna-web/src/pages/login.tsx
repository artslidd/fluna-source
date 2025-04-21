import { Button } from "@ui/ui-library/button";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Label, Input, TextField, FieldError } from "@ui/ui-library/field";
import { useLoginEmail } from "@ui/hooks/auth";
import { Form } from "@ui/ui-library/form";
import { Link } from "react-router-dom";

export function LoginPage() {
  const { mutate: login, isPending, errors } = useLoginEmail();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-200 to-white dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-black">
      <div
        className={twMerge(
          "w-full max-w-lg p-8 bg-white dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl",
          "border border-blue-300 dark:border-blue-800/30",
          "shadow-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Se connecter
        </h1>

        <div className="space-y-4 flex flex-col items-center">
          <Form
            className="space-y-4 w-95 max-w-md mx-auto"
            onSubmit={onSubmit}
            validationErrors={errors}
          >
            <TextField isRequired name="email">
              <Label>
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <FieldError />
            </TextField>

            <TextField isRequired name="password">
              <Label>
                Mot de passe <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <FieldError />
            </TextField>

            <Button
              className={twMerge(
                "w-full bg-blue-800 text-white",
                "hover:bg-blue-700"
              )}
              type="submit"
              pendingLabel="Connexion..."
            >
              {isPending ? "Connexion..." : "Se connecter"}
            </Button>

            <div className="text-center mt-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Pas encore de compte ?{" "}
              </span>
              <Link to="/signup">
                <a className="text-sm text-blue-700 hover:text-blue-600 font-medium">
                  S&apos;inscrire
                </a>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
