"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { checkboxStyles } from "./styles";
import type { CheckboxProps } from "./types";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id: externalId,
      className,
      label,
      checked = false,
      onChange,
      disabled,
      error,
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = externalId || `checkbox-${generatedId}`;
    const [state, setState] = useState<"default" | "focus">("default");

    const s = checkboxStyles({
      checked,
      disabled: !!disabled,
      error: !!error,
      state,
    });

    const handleFocus = () => !disabled && setState("focus");
    const handleBlur = () => setState("default");

    return (
      <div className={s.container()}>
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(s.input(), className)}
        />
        {label && (
          <label htmlFor={checkboxId} className={s.label()}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export type { CheckboxProps };
export { Checkbox };
