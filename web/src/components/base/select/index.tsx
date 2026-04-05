"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { selectStyles } from "./styles";
import type { SelectGroup, SelectOption, SelectProps } from "./types";

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      placeholder = "Selecione...",
      error,
      fullWidth = true,
      options,
      groups,
      value,
      onChange,
      disabled,
      size = "md",
      className,
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = generatedId;

    const [state, setState] = useState<
      "default" | "focus" | "open" | "disabled" | "error"
    >("default");

    useEffect(() => {
      if (disabled) setState("disabled");
      else if (error) setState("error");
      else setState("default");
    }, [disabled, error]);

    const handleOpenChange = (open: boolean) => {
      if (disabled || error) return;
      setState(open ? "open" : "default");
    };

    const s = selectStyles({ state, size });

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div className={cn(s.base(), fullWidth && "w-full", className)}>
        {label && (
          <label htmlFor={selectId} className={s.label()}>
            {label}
          </label>
        )}

        <SelectPrimitive.Root
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          onOpenChange={handleOpenChange}
        >
          <SelectPrimitive.Trigger
            id={selectId}
            ref={ref}
            className={s.trigger()}
          >
            <SelectPrimitive.Value
              className={selectedOption ? s.value() : s.placeholder()}
            >
              {selectedOption?.label || placeholder}
            </SelectPrimitive.Value>
            <SelectPrimitive.Icon className={s.icon()}>
              <ChevronDown size={16} />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={s.content()}
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 cursor-default">
                <ChevronUp size={16} className="text-slate-400" />
              </SelectPrimitive.ScrollUpButton>

              <SelectPrimitive.Viewport className={s.viewport()}>
                {groups
                  ? groups.map((group, groupIndex) => (
                      <SelectPrimitive.Group key={groupIndex}>
                        {group.label && (
                          <SelectPrimitive.Label className={s.groupLabel()}>
                            {group.label}
                          </SelectPrimitive.Label>
                        )}
                        {group.options.map((option) => (
                          <SelectPrimitive.Item
                            key={option.value}
                            value={option.value}
                            className={s.item()}
                          >
                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                              <SelectPrimitive.ItemIndicator
                                className={s.itemIndicator()}
                              >
                                <Check size={14} />
                              </SelectPrimitive.ItemIndicator>
                            </span>
                            <SelectPrimitive.ItemText>
                              {option.label}
                            </SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                        ))}
                      </SelectPrimitive.Group>
                    ))
                  : options.map((option) => (
                      <SelectPrimitive.Item
                        key={option.value}
                        value={option.value}
                        className={s.item()}
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          <SelectPrimitive.ItemIndicator
                            className={s.itemIndicator()}
                          >
                            <Check size={14} />
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>
                          {option.label}
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
              </SelectPrimitive.Viewport>

              <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 cursor-default">
                <ChevronDown size={16} className="text-slate-400" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {error && (
          <span className="text-xs text-red-600 font-medium mt-1">{error}</span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export type { SelectGroup, SelectOption, SelectProps };
export { Select };
