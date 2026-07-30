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
        className={cn("box-content rounded-full border border-muted", {
          "h-3 w-6": props.size === "sm",
          "h-4 w-8": (props.size ?? "md") === "md",
          "h-5 w-10": props.size === "lg",
          "h-6 w-12": props.size === "xl",
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
        children: <ThemeIcon className="size-4" aria-disabled />,
      }}
      checked={isDark}
      onCheckedChange={(checked) => {
        setTheme(checked ? "dark" : "light");
      }}
      {...props}
    />
  );
};

export { ThemeToggle };
