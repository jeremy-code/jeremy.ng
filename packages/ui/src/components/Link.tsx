import { ExternalLink } from "lucide-react";
import { Slot } from "radix-ui";
import { type PrimitivePropsWithRef } from "radix-ui/internal";
import { tv, type VariantProps } from "tailwind-variants";

const linkVariants = tv({
  base: "inline-flex items-center gap-1 decoration-from-font underline-offset-1 transition-colors transition-discrete",
  variants: {
    variant: {
      anchor: [
        "relative inline",
        "[--hash-width-in-em:0.704167em]", // 16.9 px / 24px ≈ 0.704167em
        "[--hash-padding:--spacing(1)]",
        "[--hash-total-width:calc(var(--hash-width-in-em)+var(--hash-padding))]",
        "after:absolute after:bottom-0 after:left-[calc(100%+var(--hash-padding))] after:inline-flex after:h-full after:items-center after:text-muted-foreground after:content-['#']",
        "before:absolute before:bottom-0 before:-left-(--hash-total-width) before:inline-flex before:h-full before:items-center before:text-muted-foreground before:content-['#']",
        "max-md:mr-(--hash-total-width)",
        "max-md:before:hidden md:after:hidden",
        "max-md:not-[:hover,:focus]:after:hidden md:not-[:hover,:focus]:before:hidden",
      ],
    },
    color: {
      /**
       * Styling colors based on system colors (LinkText, VisitedText). This
       * passes AA contrast ratio (light: 5.17, Dark: 5.57).
       */
      link: [
        "text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400",
        /**
         * Unfortunately, there is currently a bug in Firefox where there is a
         * flicker when transitioning text colors on visited links.
         *
         * @see {@link https://bugzilla.mozilla.org/show_bug.cgi?id=868975}
         */
        "visited:text-purple-600 visited:hover:text-purple-700 dark:visited:text-purple-500 dark:visited:hover:text-purple-400",
      ],
    },
    underline: {
      true: "underline decoration-[hsl(from_currentcolor_h_s_l/50%)] hover:decoration-[hsl(from_currentcolor_h_s_l/80%)]",
      false: "no-underline",
      hover:
        "decoration-transparent hover:underline hover:decoration-[hsl(from_currentcolor_h_s_l/80%)]",
    },
  },
  /**
   * WCAG standards technically state that links within text should have a
   * non-color visual distinction. While the default variant does not
   * underline for flexibility, it should be set to underline if there is no
   * other easily element to distinguish links within text.
   */
  defaultVariants: { underline: false },
});

type LinkProps = {
  /**
   * Opens link in new tab and adds an {@link ExternalLink} icon.
   */
  isExternal?: boolean;
} & PrimitivePropsWithRef<"a"> &
  VariantProps<typeof linkVariants>;

const Link = ({
  asChild,
  className,
  isExternal,
  children,
  variant,
  color,
  underline,
  ...props
}: LinkProps) => {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      className={linkVariants({ className, variant, color, underline })}
      // target="_blank" implies rel="noopener": https://caniuse.com/mdn-html_elements_a_implicit_noopener
      {...(isExternal && { target: "_blank" })}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {isExternal && <ExternalLink className="size-[1em] flex-none" />}
    </Comp>
  );
};

export { Link, type LinkProps };
