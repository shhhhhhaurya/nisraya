import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { CheckIcon, CloseIcon } from "../components/Icons";

/**
 * Toast notifications — the site's replacement for window.alert().
 * Messages are short, in the interface's voice, and never block the page.
 */

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (message, { type = "success", duration = 4200 } = {}) => {
      nextId.current += 1;
      const id = nextId.current;

      setToasts((current) => [...current.slice(-2), { id, message, type }]);

      if (duration) {
        window.setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      push,
      dismiss,
      notify: push,
      success: (message, options) => push(message, { ...options, type: "success" }),
      error: (message, options) => push(message, { ...options, type: "error" }),
    }),
    [push, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              "pointer-events-auto flex items-center gap-3 px-5 py-4 shadow-none animate-fade-up",
              toast.type === "error"
                ? "bg-wine text-ivory"
                : "bg-espresso-700 text-ivory",
            ].join(" ")}
          >
            {toast.type === "success" ? (
              <CheckIcon className="h-4 w-4 shrink-0 text-champagne-light" />
            ) : null}

            <p className="flex-1 text-xs leading-relaxed tracking-wide">{toast.message}</p>

            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>.");
  return context;
}
