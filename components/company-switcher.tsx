"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCompanyModal } from "@/hooks/use-company-modal"
import { useParams, useRouter } from "next/navigation"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
  const CompanyModal = useCompanyModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentCompany = formattedItems.find((item) => item.value === params.companyId);

  const [open, setOpen] = React.useState(false)

  const onStoreSelect = (company: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${company.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Company"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentCompany?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Company..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((company) => (
                <CommandItem
                  key={company.value}
                  onSelect={() => onStoreSelect(company)}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {company.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCompany?.value === company.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  CompanyModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Company
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
