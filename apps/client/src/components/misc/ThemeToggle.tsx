"use client";

import { Moon, RefreshCw, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AccessibleIcon } from "radix-ui";

import { useIsMounted } from "#hooks/useIsMounted";
import { Button, type ButtonProps } from "@jeremyng/ui/components/Button";

export const ThemeToggle = (props: ButtonProps) => {
  // Prevent hydration error and layout shift as theme must be resolved from
  // `localStorage`
  const isMounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [ThemeIcon, themeIconLabel] =
    isMounted ?
      isLight ? [Sun, "Light Mode"]
      : [Moon, "Dark Mode"]
    : [RefreshCw, "Loading"];

  return (
    <Button
      aria-label="Toggle Theme"
      title="Toggle Theme"
      type="button"
      disabled={!isMounted}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      {...props}
    >
      <AccessibleIcon.Root label={themeIconLabel}>
        <ThemeIcon />
      </AccessibleIcon.Root>
    </Button>
  );
};
