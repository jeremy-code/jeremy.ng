import { createContext, use, type ComponentPropsWithRef } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRight } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const breadcrumbVariants = tv({
  slots: {
    root: "",
    list: "flex list-none items-center [word-break:break-word] text-muted-foreground",
    item: "inline-flex items-center",
    separator: "size-[1em] text-muted-foreground",
    link: "",
    currentLink: "",
  },
  variants: {
    variant: {
      underline: {
        link: "text-foreground underline decoration-muted-foreground underline-offset-[0.2em]",
        currentLink: "text-foreground",
      },
      plain: {
        link: "text-muted-foreground transition-[color] hover:text-foreground",
        currentLink: "text-foreground",
      },
    },
    size: {
      sm: {
        list: "gap-1 text-xs",
      },
      md: { list: "gap-1.5 text-sm" },
      lg: { list: "text-md gap-2" },
    },
  },
  defaultVariants: {
    variant: "plain",
    size: "md",
  },
});

const BreadcrumbContext = createContext<ReturnType<
  typeof breadcrumbVariants
> | null>(null);

const useBreadcrumbContext = () => {
  const context = use(BreadcrumbContext);
  if (context === null) {
    throw new Error("useBreadcrumbContext must be used within a Breadcrumb");
  }
  return context;
};

type BreadcrumbProps = ComponentPropsWithRef<"nav"> &
  VariantProps<typeof breadcrumbVariants>;

const Breadcrumb = ({
  variant,
  size,
  className,
  ...props
}: BreadcrumbProps) => {
  const computedBreadcrumbVariants = breadcrumbVariants({
    size,
    variant,
  });

  return (
    <BreadcrumbContext value={computedBreadcrumbVariants}>
      <nav
        className={computedBreadcrumbVariants.root({ className })}
        {...props}
      ></nav>
    </BreadcrumbContext>
  );
};

type BreadcrumbListProps = ComponentPropsWithRef<"ul">;

const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => {
  const { list } = useBreadcrumbContext();

  return <ul className={list({ className })} {...props}></ul>;
};

type BreadcrumbItemProps = ComponentPropsWithRef<"li">;

const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => {
  const { item } = useBreadcrumbContext();

  return <li className={item({ className })} {...props}></li>;
};

type BreadcrumbSeparatorProps = ComponentPropsWithRef<typeof ChevronRight>;

const BreadcrumbSeparator = ({
  className,
  ...props
}: BreadcrumbSeparatorProps) => {
  const { separator } = useBreadcrumbContext();

  return (
    <li aria-hidden>
      <ChevronRight className={separator({ className })} {...props} />
    </li>
  );
};

type BreadcrumbLinkProps = useRender.ComponentProps<"a">;

const BreadcrumbLink = ({ render, ...props }: BreadcrumbLinkProps) => {
  const { link } = useBreadcrumbContext();

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">({ className: link() }, props),
    render,
  });
};

type BreadcrumbCurrentLinkProps = ComponentPropsWithRef<"span">;

const BreadcrumbCurrentLink = ({
  className,
  ...props
}: BreadcrumbCurrentLinkProps) => {
  const { currentLink } = useBreadcrumbContext();

  return (
    <span
      className={currentLink({ className })}
      aria-current="page"
      {...props}
    />
  );
};

export {
  Breadcrumb,
  type BreadcrumbProps,
  BreadcrumbList,
  type BreadcrumbListProps,
  BreadcrumbItem,
  type BreadcrumbItemProps,
  BreadcrumbSeparator,
  type BreadcrumbSeparatorProps,
  BreadcrumbLink,
  type BreadcrumbLinkProps,
  BreadcrumbCurrentLink,
  type BreadcrumbCurrentLinkProps,
};
