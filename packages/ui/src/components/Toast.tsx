import type { ComponentPropsWithRef } from "react";

import {
  Toast as ToastPrimitive,
  type ToastManager,
  type ToastManagerAddOptions,
  type ToastManagerUpdateOptions,
  type ToastRootToastObject,
} from "@base-ui/react/toast";
import {
  CircleAlert,
  CircleCheck,
  Info,
  Loader,
  TriangleAlert,
} from "lucide-react";
import { cn, tv } from "tailwind-variants";

import { buttonVariants } from "./Button";
import { composeRenderProps } from "../utils/composeRenderProps";

type ToastType = "loading" | "success" | "error" | "info" | "warning";

const isToastType = (value: unknown) =>
  typeof value === "string" &&
  (value === "loading" ||
    value === "success" ||
    value === "error" ||
    value === "info" ||
    value === "warning");

type ToastData = Record<PropertyKey, unknown>;

const useToastManager = () => {
  const toastManager = ToastPrimitive.useToastManager<ToastData>();

  const add = (
    options: ToastManagerAddOptions<ToastData> & { type?: ToastType },
  ) => toastManager.add(options);

  const update = (
    toastId: string,
    options: ToastManagerUpdateOptions<ToastData> & { type?: ToastType },
  ) => toastManager.update(toastId, options);

  return {
    ...toastManager,
    add,
    update,
  };
};

const toastVariants = tv({
  base: [
    "[--gap:--spacing(3)] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-swipe-movement-y)-var(--toast-offset-y)-(var(--toast-index)*var(--gap)))] [--peek:--spacing(3)] [--scale:max(0,calc(1-var(--toast-index)*0.1))] [--shrink:calc(1-var(--scale))] [--z-index:calc(1000-var(--toast-index))]",
    "absolute inset-x-0 bottom-0 z-(--z-index) flex origin-bottom items-center justify-between gap-3 rounded-md border bg-surface bg-clip-padding p-4 ease-in select-none motion-safe:transition-[opacity,translate,scale,height]",
    "after:absolute after:inset-x-0 after:top-full after:h-[calc(var(--gap)+1px)]",
    "data-limited:opacity-0",
    "data-starting-style:translate-y-full data-starting-style:opacity-0",
    "data-ending-style:opacity-0",
    "data-ending-style:data-[swipe-direction=right]:translate-x-(--toast-swipe-movement-x)",
    "data-ending-style:data-[swipe-direction=down]:translate-y-(--toast-swipe-movement-y)",
  ],
  variants: {
    variant: {
      success: "border-emerald-600 bg-emerald-500 text-emerald-50",
      error: "border-red-600 bg-red-500 text-red-50",
      info: "border-border bg-surface text-foreground",
      warning: "border-orange-600 bg-orange-500 text-orange-50",
      loading: "border-border bg-surface text-foreground",
    },
    expanded: {
      true: "h-(--toast-height) translate-x-(--toast-swipe-movement-x) translate-y-(--offset-y) scale-none",
      false:
        "h-(--height) translate-x-(--toast-swipe-movement-x) translate-y-[calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height)))] scale-(--scale)",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const TOAST_ICONS = {
  loading: Loader,
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
  warning: TriangleAlert,
};

type ToastProps = {
  toast: ToastRootToastObject<ToastData>;
} & Omit<ComponentPropsWithRef<typeof ToastPrimitive.Root>, "toast">;

const Toast = ({ toast, ...props }: ToastProps) => {
  const type = isToastType(toast.type) ? toast.type : "info";
  const ToastIcon = TOAST_ICONS[type];

  return (
    <ToastPrimitive.Root
      toast={toast}
      swipeDirection={["down", "right"]}
      {...props}
      className={composeRenderProps(props.className, (className, state) =>
        toastVariants({ className, variant: type, ...state }),
      )}
    >
      <ToastPrimitive.Content
        className={cn(
          "flex w-full items-center justify-between gap-1.5 overflow-hidden duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:transition-opacity",
          "data-behind:pointer-events-none data-behind:opacity-0",
          "data-expanded:pointer-events-auto data-expanded:opacity-100",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <ToastIcon
              className={cn("pointer-events-none size-5 shrink-0", {
                "animate-spin": type === "loading",
              })}
            />
          </div>

          <div className="flex flex-col">
            <ToastPrimitive.Title className="text-sm/relaxed font-medium" />
            <ToastPrimitive.Description className="text-sm/normal" />
          </div>
        </div>
        {toast.actionProps !== undefined && (
          <ToastPrimitive.Action
            {...toast.actionProps}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-6 px-2 text-xs font-medium",
              toast.actionProps.className,
            )}
          />
        )}
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  );
};

type ToastProviderProps = {
  toastManager?: ToastManager<ToastData>;
} & Omit<ComponentPropsWithRef<typeof ToastPrimitive.Provider>, "toastManager">;

const ToastProvider = ({ children, ...props }: ToastProviderProps) => {
  return (
    <ToastPrimitive.Provider {...props}>
      {children}
      <ToastViewport>
        <ToastList />
      </ToastViewport>
    </ToastPrimitive.Provider>
  );
};

type ToastViewportProps = ComponentPropsWithRef<typeof ToastPrimitive.Viewport>;

const ToastViewport = (props: ToastViewportProps) => {
  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        {...props}
        className={composeRenderProps(props.className, (className) =>
          cn(
            "fixed right-4 bottom-4 z-1 mx-auto w-[calc(100vw-2rem)]",
            "sm:right-8 sm:bottom-8 sm:w-90",
            className,
          ),
        )}
      />
    </ToastPrimitive.Portal>
  );
};

const ToastList = () => {
  const { toasts } = useToastManager();

  return toasts.map((toast) => <Toast key={toast.id} toast={toast} />);
};

export { useToastManager, ToastProvider, type ToastProviderProps };
