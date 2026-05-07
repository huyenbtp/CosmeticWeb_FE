"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiSelectComboboxItem {
  value: string | null;
  label: string;
  disabled?: boolean;
  raw?: any; // nguyên item để render tùy ý
}

interface MultiSelectComboboxProps<T = any> {
  items: T[];
  selectedValueList: string[];
  onSelectValue: (value: string) => void;

  // render UI
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  getDisabled?: (item: T) => boolean;

  emptyText?: string;

  // Custom render trong menu
  renderTrigger?: React.ReactNode;
  renderItem?: (item: T, isSelected: boolean) => React.ReactNode;

  disabled?: boolean;

  classname?: string;
}

export default function MultiSelectCombobox<T>({
  items,
  selectedValueList,
  onSelectValue,
  getLabel,
  getValue,
  getDisabled,
  emptyText = "No results found.",
  renderTrigger,
  renderItem,
  disabled,
  classname = "",
}: MultiSelectComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {renderTrigger ?
          renderTrigger
          : <Plus size={18} />
        }
      </PopoverTrigger>

      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup>
              {items.map((item) => {
                const value = getValue(item);
                const label = getLabel(item);
                const isSelected = selectedValueList.includes(value);
                const isDisabled = getDisabled?.(item) ?? false;

                return (
                  <CommandItem
                    key={value}
                    disabled={isDisabled}
                    onSelect={() => {
                      onSelectValue(value);
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
