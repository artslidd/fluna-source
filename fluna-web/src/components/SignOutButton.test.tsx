import { screen, fireEvent } from "@testing-library/react";
import { SignOutButton } from "@ui/components/SignOutButton";
import * as AuthHooks from "@ui/hooks/auth";
import { UseMutationResult } from "@tanstack/react-query";
import { vi } from "vitest";
import { renderWithRouter } from "@ui/utils/testHelpers";

// Create a mock mutation result
const createMockMutationResult = (
  mutate: ReturnType<typeof vi.fn>
): UseMutationResult<void, Error, void, unknown> => {
  return {
    mutate,
    data: undefined,
    error: null,
    isError: false,
    isPending: false,
    isSuccess: false,
    variables: undefined,
    reset: vi.fn(),
    status: "idle",
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    isPlaceholderData: false,
    fetchStatus: "idle",
    isIdle: true,
    context: undefined,
    submittedAt: 0,
  } as unknown as UseMutationResult<void, Error, void, unknown>;
};

// Mock the useLogout hook
vi.mock("../../hooks/auth", () => ({
  useLogout: () => createMockMutationResult(vi.fn()),
}));

describe("SignOutButton", () => {
  it("calls logout function when clicked", () => {
    const mockLogout = vi.fn();
    vi.spyOn(AuthHooks, "useLogout").mockImplementation(() =>
      createMockMutationResult(mockLogout)
    );

    renderWithRouter(<SignOutButton />);

    // Click the button
    fireEvent.click(screen.getByRole("button", { name: /Déconnexion/i }));

    // Check if logout was called
    expect(mockLogout).toHaveBeenCalled();
  });
});
