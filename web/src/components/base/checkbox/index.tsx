"use client";

import { Check } from "lucide-react";
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
      checked: controlledChecked,
      onChange,
      disabled,
      error,
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = externalId || `checkbox-${generatedId}`;
    const [internalChecked, setInternalChecked] = useState(false);

    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const s = checkboxStyles({
      checked: isChecked,
      disabled: !!disabled,
      error: !!error,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked;
      if (!isControlled) {
        setInternalChecked(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div className={s.container()}>
        <div className={s.wrapper()}>
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className={cn(s.input(), className)}
          />
          {isChecked && (
            <Check
              className="absolute text-white pointer-events-none"
              size={12}
              strokeWidth={3}
            />
          )}
        </div>
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
