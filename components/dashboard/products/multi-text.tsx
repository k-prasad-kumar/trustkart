"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  isPending: boolean;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
  isPending,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    // checking value is empty
    if (item.length <= 0) return;

    // checking value already exists
    if (value.includes(item)) return;

    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue(inputValue.toLowerCase());
            }
          }}
          disabled={isPending}
        />
        <Button
          type="button"
          onClick={() => addValue(inputValue.toLowerCase())}
          variant="link"
          disabled={isPending}
          className="border"
        >
          <PlusIcon />
        </Button>
      </div>

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index}>
            {item}
            <button
              className="pl-2"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
