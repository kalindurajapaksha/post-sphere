"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type LangItemType = { value: string; label: string; dir: "rtl" | "ltr" };

type LocaleSwitcherSelectProps = {
  items: LangItemType[];
};

export default function LocaleSwitcherSelect({
  items,
}: LocaleSwitcherSelectProps) {
  function onChange(value: LangItemType) {
    const locale = value.value as Locale;
    setUserLocale(locale);
    document.dir = value.dir;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <DropdownMenuItem key={item.value} onClick={() => onChange(item)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
