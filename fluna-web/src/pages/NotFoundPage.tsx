import { twMerge } from "tailwind-merge";
import { Button } from "@ui/ui-library/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            404 - Page Not Found
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Oups ! Page introuvable
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
            <Button
              onPress={() => navigate("/login")}
              className={twMerge(
                "bg-emerald-700 text-white",
                "hover:bg-emerald-600"
              )}
            >
              Retour à l&apos;accueil
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
