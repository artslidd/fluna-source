import { screen, fireEvent } from "@testing-library/react";
import {
  SideNavigation,
  MainNavigation,
  UserMenuPopover,
} from "@ui/components/NavigationBar";
import { renderWithProviders } from "@ui/utils/testHelpers";
describe("NavigationBar", () => {
  describe("SideNavigation", () => {
    it("renders the side navigation with correct initial state", () => {
      renderWithProviders(<SideNavigation isMobileMenuOpen={false} />);

      // Check if the logo is present
      expect(screen.getByAltText("Logo Fluna")).toBeInTheDocument();

      // Check if the title is present
      expect(screen.getByText("Fluna")).toBeInTheDocument();
    });

    it("collapses and expands when the collapse button is clicked", () => {
      renderWithProviders(<SideNavigation isMobileMenuOpen={false} />);

      // Find and click the collapse button
      const collapseButton = screen.getByRole("button", { name: /collapse/i });
      fireEvent.click(collapseButton);

      // Check if the navigation is collapsed
      const navigation = screen.getByRole("navigation", {
        name: "Main navigation",
      });
      expect(navigation).toHaveClass("w-16");

      // Click again to expand
      fireEvent.click(collapseButton);
      expect(navigation).toHaveClass("w-48");
    });
  });

  describe("MainNavigation", () => {
    it("renders all navigation items", () => {
      renderWithProviders(<MainNavigation isCollapsed={false} />);

      // Check if all navigation items are present
      expect(screen.getByText("Tableau de Bord")).toBeInTheDocument();
      expect(screen.getByText("Devis")).toBeInTheDocument();
      expect(screen.getByText("Factures")).toBeInTheDocument();
      expect(screen.getByText("Planning")).toBeInTheDocument();
      expect(screen.getByText("Chantiers")).toBeInTheDocument();
    });
  });

  describe("UserMenuPopover", () => {
    it("renders the user menu with correct user information", () => {
      renderWithProviders(<UserMenuPopover isCollapsed={false} />);

      // Check if user information is displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByAltText("Avatar")).toBeInTheDocument();
    });

    it("opens and closes the popover when clicked", () => {
      renderWithProviders(<UserMenuPopover isCollapsed={false} />);

      // Click the user menu button
      const userMenuButton = screen.getByRole("button", { name: /user menu/i });
      fireEvent.click(userMenuButton);

      // Check if the popover is open
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Click again to close
      fireEvent.click(userMenuButton);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
