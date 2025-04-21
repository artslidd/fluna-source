import { render, screen, fireEvent } from "@testing-library/react";
import { Layout } from "@ui/components/Layout";
import { SessionProvider } from "@ui/contexts/SessionContext";
import { renderWithProviders } from "@ui/utils/testHelpers";
import { BrowserRouter } from "react-router-dom";

describe("Layout", () => {
  it("renders the layout with children", () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check if the content is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    // Check if the mobile menu button is present
    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it.skip("toggles mobile menu when menu button is clicked", () => {
    // Mock viewport width to mobile size
    global.innerWidth = 500; // Mobile width
    global.dispatchEvent(new Event("resize"));

    render(
      <BrowserRouter>
        <SessionProvider>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </SessionProvider>
      </BrowserRouter>
    );

    // Get the menu button
    const menuButton = screen.getByRole("button", { name: /menu/i });

    // Verify initial mobile state
    const navigation = screen.getByLabelText("Main navigation");
    expect(navigation).toHaveClass("-translate-x-full");
    expect(navigation).not.toHaveClass("translate-x-0");

    // Click the menu button to show
    fireEvent.click(menuButton);
    expect(navigation).toHaveClass("translate-x-0");

    // Click again to hide
    fireEvent.click(menuButton);
    expect(navigation).toHaveClass("-translate-x-full");
  });

  it("renders the side navigation", () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check if the side navigation is present
    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
  });
});
