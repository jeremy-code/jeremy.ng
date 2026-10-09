import type { UseThemeProps } from "next-themes";
import { describe, expect, vi, it } from "vitest";
import { render } from "vitest-browser-react";

import { ThemeToggle } from "./ThemeToggle";

let mockResolvedTheme = "light";
const mockSetTheme = vi.fn<UseThemeProps["setTheme"]>();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle", () => {
  it("renders light theme correctly", async () => {
    mockResolvedTheme = "light";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByTitle("Switch to dark theme")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute(
      "data-unchecked",
    );
  });

  it("renders dark theme correctly", async () => {
    mockResolvedTheme = "dark";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByTitle("Switch to light theme")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute("data-checked");
  });

  it("switches to dark theme when clicked in light theme", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("dark");
  });

  it("switches to light theme when clicked in dark theme", async () => {
    mockResolvedTheme = "dark";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("light");
  });

  it("renders children", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle>Theme</ThemeToggle>);

    await expect.element(screen.getByText("Theme")).toBeInTheDocument();
  });
});
