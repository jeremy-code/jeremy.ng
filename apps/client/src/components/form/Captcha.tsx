import { Turnstile, type TurnstileProps } from "@marsidev/react-turnstile";
import { cn } from "tailwind-variants";

import { env } from "#utils/env";
import { Skeleton } from "@jeremyng/ui/components/Skeleton";

type CaptchaProps = Omit<TurnstileProps, "siteKey">;

const Captcha = ({ className, ...props }: CaptchaProps) => {
  return (
    <Turnstile
      data-size={props.options?.size ?? "normal"} // Defaults to "normal" size
      // Dimensions from https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/#widget-sizes
      className={cn(
        "relative",
        "data-[size=normal]:h-16.25 data-[size=normal]:w-75",
        "data-[size=flexible]:h-16.25 data-[size=flexible]:w-full data-[size=flexible]:min-w-75",
        "data-[size=compact]:h-12.5 data-[size=compact]:w-62.5",
        className,
      )}
      siteKey={env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY}
      {...props}
    >
      <Skeleton className="absolute inset-0 -z-1 rounded-none" />
    </Turnstile>
  );
};

export { Captcha };
