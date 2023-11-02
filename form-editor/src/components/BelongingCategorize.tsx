// @ts-nocheck

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function BelongingCategorize({index, options,categoryId, questionId, categories, updateQuestion}: {index: number, categoryId: number, questionId: number, options: any, categories: any, updateQuestion: (questionId: number, updateAttribute: any) => void}) {
    const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {categoryId
            ? categories.find((cat: any) => cat.id === categoryId)?.value
            : "Select Belonging..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {categories.map((cat: any) => (
              <CommandItem
                key={cat.id}
                value={cat.value}
                onSelect={(currentValue) => {
                  // console.log(currentValue)
                  const catId = categories?.find((cat: any) => cat.value.toLowerCase() === currentValue.toLowerCase())?.id;
                  
                  // console.log(catId, "catId");
                  const updateOptions = [...options];
                  updateOptions[index] = {
                    ...updateOptions[index],
                    categoryId: catId,
                  };
                  // console.log(updateOptions, "updateOptions")
                  updateQuestion(questionId, {options: updateOptions} )
                  setOpen(false)
                }}
                
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    categoryId === cat.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {/* {cat.value == "" ? "Empty Category": cat.value} */}
                {cat.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default BelongingCategorize