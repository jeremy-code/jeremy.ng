import type { ComponentPropsWithRef } from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";
import { useToastStore } from "../hooks/useToast";

type ToasterProps = ComponentPropsWithRef<typeof ToastProvider>;

const Toaster = (props: ToasterProps) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <ToastProvider {...props}>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex flex-col gap-1">
            {!!title && <ToastTitle>{title}</ToastTitle>}
            {!!description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};

export { Toaster, type ToasterProps };
