import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeSwitcher } from "@ui/components/ThemeSwitcher";
import * as ThemeContext from "@ui/contexts/ThemeContext";
import { vi } from "vitest";

// Mock the ThemeProvider and useTheme hook
vi.mock("@ui/contexts/ThemeContext", () => ({
  ...vi.importActual("@ui/contexts/ThemeContext"),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

describe("ThemeSwitcher", () => {
  it("renders the theme switcher with correct initial theme", () => {
    render(<ThemeSwitcher />);

    // Check if the current theme text is displayed
    expect(screen.getByText("Thème: Clair")).toBeInTheDocument();

    // Check if all theme buttons are present
    expect(screen.getByRole("radio", { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /system/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /dark/i })).toBeInTheDocument();
  });

  it("changes theme when a different theme button is clicked", () => {
    const setTheme = vi.fn();
    vi.spyOn(ThemeContext, "useTheme").mockImplementation(() => ({
      theme: "light",
      setTheme,
    }));

    render(<ThemeSwitcher />);

    // Click the dark theme button
    fireEvent.click(screen.getByRole("radio", { name: /dark/i }));

    // Verify that setTheme was called with 'dark'
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
