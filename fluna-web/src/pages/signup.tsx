import { Button } from "@ui/ui-library/button";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Label, Input, TextField, FieldError } from "@ui/ui-library/field";
import { useSignUp } from "@ui/hooks/auth";
import { Form } from "@ui/ui-library/form";
import { Text } from "@ui/ui-library/text";

export function SignUpPage() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useSignUp();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Password length validation
    if (formData.password.length < 8) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Veuillez entrer une adresse email valide";
    }

    // Username validation
    if (formData.username.length < 3) {
      errors.username =
        "Le nom d&apos;utilisateur doit contenir au moins 3 caractères";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    signUp({
      email: formData.email,
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-200 to-white dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-black"
      onClick={() => navigate("/")}
    >
      <div
        className={twMerge(
          "w-full max-w-xl p-8 bg-white dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl",
          "border border-blue-300 dark:border-blue-800/30",
          "shadow-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Créer un compte
        </h1>

        <div className="space-y-4 flex flex-col items-center">
          <Form
            className="space-y-4 w-full"
            onSubmit={onSubmit}
            validationErrors={errors}
          >
            <TextField isRequired name="username">
              <Label>
                Nom d&apos;utilisateur <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
              <FieldError />
            </TextField>

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
              {!errors.password && (
                <Text slot="description" className="text-red-500">
                  {errors.password}
                </Text>
              )}
            </TextField>

            <TextField isRequired name="confirmPassword">
              <Label>
                Confirmer le mot de passe{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
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
              isPending={isPending}
              pendingLabel="Création du compte..."
            >
              {isPending ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </Form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-6">
            Déjà un compte ?{" "}
            <Link to="/login">
              <a className="text-blue-700 hover:text-blue-600 font-medium">
                Se connecter
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
