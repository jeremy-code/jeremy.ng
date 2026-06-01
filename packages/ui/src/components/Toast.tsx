import type { ComponentPropsWithRef } from "react";

import { X } from "lucide-react";
import { AccessibleIcon, Toast as ToastPrimitives } from "radix-ui";
import { twMerge } from "tailwind-merge";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { Button, type ButtonProps } from "./Button";

const { Provider: ToastProvider } = ToastPrimitives;

const ToastViewport = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Viewport>) => (
  <ToastPrimitives.Viewport
    className={cn(
      "fixed right-0 bottom-0 z-[calc(infinity)] flex w-full max-w-dvw flex-col gap-2 p-6 sm:w-100",
      className,
    )}
    {...props}
  />
);

const toastVariants = tv({
  base: [
    "flex items-center justify-between gap-4 rounded-md p-4 shadow-2xl transition-[translate,opacity] transition-discrete starting:data-[state=open]:opacity-0",
    "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=move]:translate-y-(--radix-toast-swipe-move-y)",
    "data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=end]:translate-y-(--radix-toast-swipe-end-y)",
  ],
  variants: {
    variant: {
      default: "border bg-background text-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

type ToastProps = ComponentPropsWithRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>;

const Toast = ({ className, variant, ...props }: ToastProps) => {
  return (
    <ToastPrimitives.Root
      className={twMerge(toastVariants({ className, variant }))}
      data-variant={variant}
      {...props}
    />
  );
};

const ToastTitle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Title>) => (
  <ToastPrimitives.Title
    className={cn("text-sm font-medium", className)}
    {...props}
  />
);

const ToastDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Description>) => (
  <ToastPrimitives.Description
    className={cn(
      "text-sm text-muted-foreground",
      "in-data-[variant='destructive']:text-red-50",
      className,
    )}
    {...props}
  />
);

const ToastAction = ({
  children,
  buttonProps,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Action> & {
  buttonProps: ButtonProps;
}) => (
  <ToastPrimitives.Action {...props}>
    <Button {...buttonProps}>{children}</Button>
  </ToastPrimitives.Action>
);

const ToastClose = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Close>) => (
  <ToastPrimitives.Close asChild {...props}>
    <Button
      color="default"
      variant="surface"
      size="icon"
      className={cn(
        "in-data-[variant='destructive']:border-0 in-data-[variant='destructive']:bg-destructive in-data-[variant='destructive']:text-destructive-foreground in-data-[variant='destructive']:hover:bg-red-700",
        className,
      )}
    >
      <AccessibleIcon.Root label="Close">
        <X className="size-4" />
      </AccessibleIcon.Root>
    </Button>
  </ToastPrimitives.Close>
);

export {
  ToastProvider,
  ToastViewport,
  Toast,
  type ToastProps,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
};
