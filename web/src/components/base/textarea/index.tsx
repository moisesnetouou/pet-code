"use client";

import { forwardRef, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { textareaStyles } from "./styles";
import type { TextareaProps } from "./types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      rows = 4,
      fullWidth = true,
      disabled,
      placeholder,
      value,
      onChange,
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = `textarea-${generatedId}`;

    const [state, setState] = useState<
      "default" | "filled" | "focus" | "disabled" | "error"
    >("default");

    useEffect(() => {
      if (disabled) setState("disabled");
      else if (error) setState("error");
      else if (value) setState("filled");
      else setState("default");
    }, [disabled, error, value]);

    const handleFocus = () => {
      if (!disabled && !error) setState("focus");
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (error) setState("error");
      else if (val) setState("filled");
      else setState("default");
    };

    const s = textareaStyles({ state });

    return (
      <div className={cn(s.base(), fullWidth && "w-full")}>
        {label && (
          <label htmlFor={textareaId} className={s.label()}>
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(s.textarea(), className)}
        />
        {error && <span className={s.error()}>{error}</span>}
        {helperText && !error && (
          <span className={s.helper()}>{helperText}</span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export type { TextareaProps };
export { Textarea };
