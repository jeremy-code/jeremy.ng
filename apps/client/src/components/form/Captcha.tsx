import type { ComponentPropsWithRef } from "react";

import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import { cn } from "tailwind-variants";

import { env } from "#config/env";
import { assertNever } from "#utils/assertNever";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

type CaptchaProps = Omit<ComponentPropsWithRef<typeof Turnstile>, "siteKey">;

const Captcha = ({ className, options, ...props }: CaptchaProps) => {
  const { theme } = useTheme();

  return (
    <Turnstile
      data-size={options?.size ?? "normal"} // Defaults to "normal" size
      // Dimensions from https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/#widget-sizes
      className={cn(
        "relative",
        "data-[size=normal]:h-16.25 data-[size=normal]:w-75",
        "data-[size=flexible]:h-16.25 data-[size=flexible]:w-full data-[size=flexible]:min-w-75",
        "data-[size=compact]:h-12.5 data-[size=compact]:w-62.5",
        className,
      )}
      siteKey={env.VITE_CF_TURNSTILE_SITE_KEY}
      options={{
        theme:
          theme === "system" ? "auto"
          : theme === "dark" || theme === "light" || theme === undefined ? theme
          : assertNever(theme as never),
        ...options,
      }}
      {...props}
    >
      <Skeleton className="absolute inset-0 -z-1 rounded-none" />
    </Turnstile>
  );
};

export { Captcha };
