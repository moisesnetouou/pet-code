"use client";

import { forwardRef, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = true,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [state, setState] = useState<
      "default" | "filled" | "focus" | "disabled" | "error"
    >("default");
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      if (disabled) setState("disabled");
      else if (error) setState("error");
      else if (hasValue) setState("filled");
      else setState("default");
    }, [disabled, error, hasValue]);

    const handleFocus = () => {
      if (!disabled && !error) setState("focus");
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHasValue(!!value);
      if (error) setState("error");
      else if (value) setState("filled");
      else setState("default");
    };

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium transition-colors",
              state === "focus" ? "text-teal-700" : "text-slate-700",
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          data-state={state}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-lg px-4 py-3 text-sm transition-all",
            "border bg-white text-slate-800 placeholder:text-slate-400",

            // Estados via data-[state=xxx]
            "data-[state=default]:border-teal-300",
            "data-[state=filled]:border-teal-400",
            "data-[state=focus]:border-teal-500 data-[state=focus]:outline-2 data-[state=focus]:outline-teal-500",
            "data-[state=disabled]:border-slate-200 data-[state=disabled]:bg-slate-100 data-[state=disabled]:opacity-50 data-[state=disabled]:cursor-not-allowed data-[state=disabled]:text-slate-400",
            "data-[state=error]:border data-[state=error]:border-red-500 data-[state=error]:outline-2 data-[state=error]:outline-red-500",

            // Hover states (exceto disabled e error)
            "hover:data-[state=default]:border-teal-400",
            "hover:data-[state=filled]:border-teal-500",
            "hover:data-[state=focus]:border-teal-600",
            "data-[state=disabled]:hover:border-slate-200",
            "data-[state=error]:hover:border-red-600",

            className,
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-600 font-medium">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-xs text-slate-500">{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
