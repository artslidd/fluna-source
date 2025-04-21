import { Button } from "@ui/ui-library/button";
import { twMerge } from "tailwind-merge";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-emerald-200 dark:border-emerald-900/30 bg-emerald-100/90 dark:bg-[#0a1f0a]/90 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo Fluna" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Fluna
              </h1>
            </Link>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#features"
                  className={twMerge(
                    "text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400",
                    "transition-colors"
                  )}
                >
                  Fonctionnalités
                </a>
                <a
                  href="#pricing"
                  className={twMerge(
                    "text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400",
                    "transition-colors"
                  )}
                >
                  Tarifs
                </a>
                <a
                  href="#contact"
                  className={twMerge(
                    "text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400",
                    "transition-colors"
                  )}
                >
                  Contact
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className={twMerge(
                      "text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400",
                      "border-emerald-300 dark:border-emerald-700/30 hover:border-emerald-400 dark:hover:border-emerald-600/50",
                      "transition"
                    )}
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className={twMerge(
                      "bg-emerald-700 text-white hover:bg-emerald-600",
                      "transition-colors"
                    )}
                  >
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
