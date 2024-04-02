"use client";

import { ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";

import { Icon, IconSwitch, type IconSwitchProps } from "@/components/ui";
import { useHydrated } from "@/hooks/useHydrated";

export const ToggleThemeSwitch = (props: IconSwitchProps) => {
  // prevent hydration error and layout shift
  // necessary as server-side rendering doesn't have access to localStorage
  const hydrated = useHydrated();
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <IconSwitch
      {...props}
      size="lg"
      // switch will initially be unchecked, after checking localStorage on
      // hydration, correct value will be set
      checked={hydrated && isLight}
      onCheckedChange={() => setTheme(isLight ? "dark" : "light")}
      icon={
        <Icon size="xs" animation={hydrated ? "initial" : "spin"}>
          {hydrated ? isLight ? <SunIcon /> : <MoonIcon /> : <ArrowPathIcon />}
        </Icon>
      }
    />
  );
};
