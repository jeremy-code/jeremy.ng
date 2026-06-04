import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "tailwind-variants";

import { useIsMounted } from "#hooks/useIsMounted";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";
import { Switch, type SwitchProps } from "@jeremyng/ui/components/Switch";

const ThemeToggle = (props: SwitchProps) => {
  const isMounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!isMounted) {
    // Avoid hydration error and layout shift as theme must be resolved from
    // `localStorage`
    return (
      <Skeleton
        className={cn("rounded-full", {
          "h-3 w-6": props.size === "xs",
          "h-4 w-8": props.size === "sm",
          "h-5 w-10": (props.size ?? "md") === "md",
          "h-7 w-12": props.size === "lg",
        })}
      />
    );
  }

  const [ThemeIcon, title] =
    isDark ? [Moon, "Switch to light theme"] : [Sun, "Switch to dark theme"];

  return (
    <Switch
      title={title}
      switchThumbProps={{
        className: "bg-background text-solid dark:text-foreground",
      }}
      checked={isDark}
      onCheckedChange={(checked) => {
        setTheme(checked ? "dark" : "light");
      }}
      {...props}
    >
      <ThemeIcon className="size-4" aria-disabled />
    </Switch>
  );
};

export { ThemeToggle };
