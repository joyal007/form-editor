import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  categorizeQuestion,
  clozeQuestion,
  comprehensiveQuestion,
} from "@/defaultValues/formData";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "categorize",
    label: "Categorize",
  },
  {
    value: "cloze",
    label: "Cloze",
  },
  {
    value: "comprehensive",
    label: "Comprehensive",
  },
];

export default function QuestionSelector({
  resetQuestion,
  type,
  questionId,
}: {
  questionId: number;
  resetQuestion: (questionId: number, defaultValue: any) => void;
  type: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(type);

  const changeQuestionType = (value: any) => {
    // if(open)
    if (value == "categorize")
      resetQuestion(questionId, { ...categorizeQuestion });
    else if (value == "cloze") resetQuestion(questionId, { ...clozeQuestion });
    else if (value == "comprehensive")
      resetQuestion(questionId, { ...comprehensiveQuestion });
    // updateQuestion(questionId, {type: value})
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  changeQuestionType(currentValue)
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
