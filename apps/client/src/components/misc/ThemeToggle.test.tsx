import { describe, expect, vi, test, beforeEach } from "vitest";
import { render } from "vitest-browser-react";

import { ThemeToggle } from "./ThemeToggle";

let mockResolvedTheme = "light";
const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders light theme correctly", async () => {
    mockResolvedTheme = "light";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByTitle("Switch to dark theme")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).not.toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  test("renders dark theme correctly", async () => {
    mockResolvedTheme = "dark";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByTitle("Switch to light theme")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  test("switches to dark theme when clicked in light theme", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("dark");
  });

  test("switches to light theme when clicked in dark theme", async () => {
    mockResolvedTheme = "dark";
    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("light");
  });

  test("renders children", async () => {
    mockResolvedTheme = "light";
    const screen = await render(<ThemeToggle>Theme</ThemeToggle>);

    await expect.element(screen.getByText("Theme")).toBeInTheDocument();
  });
});
