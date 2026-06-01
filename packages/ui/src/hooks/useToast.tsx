import type { ComponentProps, ReactElement, ReactNode } from "react";

import { nanoid } from "nanoid";
import { create } from "zustand";

import { ToastAction, type ToastProps } from "../components/Toast";

const MAX_NUMBER_OF_TOASTS = 5;
const TOAST_DISMISS_DELAY_IN_MS = 7_000; // 7 seconds

/**
 * A Toast in the <Toaster /> component that can be added with the {@link toast}
 * function.
 */
type ToasterToast = {
  id: ReturnType<typeof nanoid>;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactElement<ComponentProps<typeof ToastAction>, typeof ToastAction>;
} & ToastProps;

type ToastState = {
  toasts: ToasterToast[];
  addToast: (toast: ToasterToast) => void;
  updateToast: (
    toast: Partial<ToasterToast> & Pick<ToasterToast, "id">,
  ) => void;
  /**
   * If given a toastId, dismiss that toast after
   * {@link TOAST_DISMISS_DELAY_IN_MS} ms. Otherwise, dismiss all toasts.
   */
  dismissToast: (toastId?: ToasterToast["id"]) => void;
  /**
   * If given a toastId, remove that toast from array. Otherwise, remove all
   * toasts.
   */
  removeToast: (toastId?: ToasterToast["id"]) => void;
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Zustand store of type {@link ToastState} manages toasts in a stack of length
 * up to {@link MAX_NUMBER_OF_TOASTS}.
 */
const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [toast, ...state.toasts].slice(0, MAX_NUMBER_OF_TOASTS),
    })),
  updateToast: (toast) =>
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === toast.id ? { ...t, ...toast } : t,
      ),
    })),
  dismissToast: (toastId) =>
    set((state) => {
      const toastIdsToDismiss =
        toastId !== undefined ?
          [toastId]
        : state.toasts.map((toast) => toast.id);

      toastIdsToDismiss.forEach((toastId) => {
        if (!toastTimeouts.has(toastId)) {
          const timeout = setTimeout(() => {
            toastTimeouts.delete(toastId);
            state.removeToast(toastId);
          }, TOAST_DISMISS_DELAY_IN_MS);

          toastTimeouts.set(toastId, timeout);
        }
      });

      return {};
    }),
  removeToast: (toastId) =>
    set((state) => {
      return {
        toasts:
          toastId !== undefined ?
            state.toasts.filter((toast) => toast.id !== toastId)
          : [],
      };
    }),
}));

/**
 * Creates a new Toast with a random ID, returns its ID, and functions to
 * dismiss and update it.
 *
 * @note If you want to properly use the `dismiss` functions instead of having
 * it be controlled by the <Toast />'s `duration` prop, set `duration` to
 * Infinity. By default,
 */
const toast = (props: Omit<ToasterToast, "id">) => {
  const id = nanoid();

  const { addToast, updateToast, dismissToast, removeToast } =
    useToastStore.getState();

  const update = (props: ToasterToast) => updateToast({ ...props, id });
  const dismiss = () => dismissToast(id);
  const remove = () => removeToast(id);

  addToast({
    ...props,
    id,
    open: true,
    // After toast.duration ms, onOpenChange is called where open is false
    onOpenChange(open) {
      if (open === false) {
        remove();
      }
    },
  });

  return { id, update, dismiss, remove };
};

export { useToastStore, toast };
