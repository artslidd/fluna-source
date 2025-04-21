import { render, screen, fireEvent } from "@testing-library/react";
import { LoginWithGoogle } from "./LoginWithGoogle";
import { useLoginGoogle } from "../../hooks/auth";
import { vi } from "vitest";

vi.mock("../../hooks/auth", () => ({
  useLoginGoogle: vi.fn(),
}));

describe("LoginWithGoogle", () => {
  it("renders the Google login button", () => {
    const mockLoginWithGoogle = vi.fn();
    (useLoginGoogle as ReturnType<typeof vi.fn>).mockReturnValue({
      loginWithGoogle: mockLoginWithGoogle,
    });

    render(<LoginWithGoogle />);

    const button = screen.getByRole("button", {
      name: /Continuer avec Google/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("calls loginWithGoogle when clicked", () => {
    const mockLoginWithGoogle = vi.fn();
    (useLoginGoogle as ReturnType<typeof vi.fn>).mockReturnValue({
      loginWithGoogle: mockLoginWithGoogle,
    });

    render(<LoginWithGoogle />);

    const button = screen.getByRole("button", {
      name: /Continuer avec Google/i,
    });
    fireEvent.click(button);

    expect(mockLoginWithGoogle).toHaveBeenCalledTimes(1);
  });
});
