import type { ComponentPropsWithRef } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

const blockquoteVariants = tv({
  base: "relative flex flex-col gap-2",
  variants: {
    justify: {
      start: "items-start text-start",
      center: "items-center text-center",
      end: "items-end text-end",
    },
    variant: {
      subtle: "border-s-4 border-s-muted px-5",
      solid: "border-s-4 border-s-solid px-5",
      plain: "px-5",
    },
  },
  defaultVariants: { variant: "subtle", justify: "start" },
});

type BlockquoteProps = ComponentPropsWithRef<"figure"> &
  VariantProps<typeof blockquoteVariants>;

const Blockquote = ({
  className,
  justify,
  variant,
  ...props
}: BlockquoteProps) => {
  return (
    <figure
      {...props}
      className={blockquoteVariants({ className, justify, variant })}
    />
  );
};

type BlockquoteContentProps = ComponentPropsWithRef<"blockquote">;

const BlockquoteContent = (props: BlockquoteContentProps) => {
  return <blockquote {...props} />;
};

type BlockquoteCaptionProps = ComponentPropsWithRef<"figcaption">;

const BlockquoteCaption = (props: BlockquoteCaptionProps) => {
  return (
    <figcaption
      {...props}
      className={cn(props.className, "text-sm text-muted-foreground")}
    />
  );
};

export {
  Blockquote,
  type BlockquoteProps,
  BlockquoteContent,
  type BlockquoteContentProps,
  BlockquoteCaption,
  type BlockquoteCaptionProps,
};
