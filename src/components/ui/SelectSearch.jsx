"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function SymbolCombobox({ symbols = [], onSymbolSelect }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  function handleSelectSymbol(currentValue) {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    if (onSymbolSelect) {
      onSymbolSelect(currentValue)
    }
  }

  function handleSearch() {
    if (value) {
      console.log(`Searching for symbol: ${value}`)
      // Implement your search logic here
    }
  }

  return (
    <div className="flex space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value || "Select Symbol"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search symbol..." />
            <CommandList>
              <CommandEmpty>No symbol found.</CommandEmpty>
              <CommandGroup>
                <CommandItem value="select-symbol" onSelect={() => handleSelectSymbol("")}>
                  Select Symbol
                </CommandItem>
                {symbols.map((symbol, index) => (
                  <CommandItem
                    key={index}
                    value={symbol}
                    onSelect={handleSelectSymbol}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === symbol ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {symbol}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={handleSearch}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default SymbolCombobox