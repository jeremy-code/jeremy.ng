"use client";

import type { ComponentPropsWithRef } from "react";

import { Moon, RefreshCw, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AccessibleIcon } from "radix-ui";

import { useIsMounted } from "#hooks/useIsMounted";
import { cn } from "@jeremyng/ui/utils";

export const ThemeToggle = ({
  className,
  ...props
}: ComponentPropsWithRef<"button">) => {
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
    <button
      aria-label="Toggle Theme"
      title="Toggle Theme"
      type="button"
      className={cn(
        "rounded-md border border-gray-300 bg-white/50 px-3 py-2 shadow-sm backdrop-blur transition hover:bg-white/70 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-900/70",
        className,
      )}
      disabled={!isMounted}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      {...props}
    >
      <AccessibleIcon.Root label={themeIconLabel}>
        <ThemeIcon
          size={16} // spacing-4 = 1rem
        />
      </AccessibleIcon.Root>
    </button>
  );
};
