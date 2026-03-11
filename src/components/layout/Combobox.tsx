"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComboboxItem {
  value: string | null;
  label: string;
  disabled?: boolean;
  raw?: any; // nguyên item để render tùy ý
}

interface ComboboxProps<T = any> {
  items: T[];
  selectedValue: string | null;
  onChange: (value: string | null) => void;

  // render UI
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  getDisabled?: (item: T) => boolean;

  placeholder?: string;
  emptyText?: string;

  // Custom render trong menu
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;

  disabled?: boolean;
  allowNull?: boolean; // có cho option “None” không
  nullLabel?: string;

  variant?: "default" | "outline" | "input" | "link" | "destructive" | "secondary" | "ghost";
  classname?: string;
}

export default function Combobox<T>({
  items,
  selectedValue,
  onChange,
  getLabel,
  getValue,
  getDisabled,
  placeholder = "Select...",
  emptyText = "No results found.",
  renderItem,
  disabled,
  allowNull = false,
  nullLabel = "None",
  variant = "default",
  classname = "",
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedItem =
    items.find((item) => getValue(item) === selectedValue) ?? null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          className={cn("w-full h-12 justify-between",
            classname
          )}
          disabled={disabled}
        >
          <span className={cn("overflow-x-hidden font-normal",
            !selectedItem ? "text-muted-foreground" : ""
          )}>
            {selectedItem ? getLabel(selectedItem) : placeholder}
          </span>
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup>
              {/* Option None */}
              {allowNull && (
                <CommandItem
                  onSelect={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                >
                  <span>{nullLabel}</span>
                  {!selectedValue && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
              )}

              {items.map((item) => {
                const value = getValue(item);
                const label = getLabel(item);
                const isSelected = selectedValue === value;
                const isDisabled = getDisabled?.(item) ?? false;

                return (
                  <CommandItem
                    key={value}
                    disabled={isDisabled}
                    onSelect={() => {
                      onChange(value);
                      setOpen(false);
                    }}
                  >
                    {renderItem ? (
                      renderItem(item, isSelected)
                    ) : (
                      <>
                        <span>{label}</span>
                        {isSelected && <Check className="ml-auto h-4 w-4" />}
                      </>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
