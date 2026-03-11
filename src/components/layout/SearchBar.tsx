"use client";

import { useState } from "react";
import { useRouter, useSearchParams, } from "next/navigation";
import { cn, updateQueryParams } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  placeholder: string;
  willUpdateQuery?: boolean;
  onChange?: (query: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({ placeholder, willUpdateQuery, onChange, onSearch, className }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(willUpdateQuery ? (searchParams.get("q") ?? "") : "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (willUpdateQuery) {
        const newQuery = updateQueryParams(searchParams, {
          q: value,
          page: 1, // reset page khi search
        });

        router.push(`?${newQuery}`);
      } else if (onSearch) {
        onSearch(value);
      }
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
          setValue(e.target.value)
        } }
        onKeyDown={handleKeyDown}
        className={cn("pl-10 w-96", className)}
      />
    </div>
  );
}