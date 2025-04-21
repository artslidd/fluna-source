import { ReactNode, useState } from "react";
import { SideNavigation } from "./NavigationBar";
import { Button } from "../ui-library/button";
import { Icon } from "../ui-library/icon";
import { MenuIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Button
        variant="plain"
        isIconOnly
        className={twMerge(
          "fixed  z-50 md:hidden",
          isMobileMenuOpen ? "top-2 left-55" : "top-2 left-4"
        )}
        onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Icon>
          <MenuIcon className="h-6 w-6" />
        </Icon>
      </Button>

      <div
        className={twMerge(
          "fixed md:relative transition-all duration-300 z-40",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        <SideNavigation isMobileMenuOpen={isMobileMenuOpen} />
      </div>

      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
