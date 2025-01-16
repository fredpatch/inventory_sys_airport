"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { SimHolder } from "@/lib/helpers";
import { useSimStore } from "@/context/sim-store";

interface CategoryComponentProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<
    React.SetStateAction<SimHolder["subscriptions"]>
  >;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { setValue } = useFormContext(); // Access react-hook-form's context

  // const handleCategoryChange = (value: string) => {
  //   const category = value as SimHolder["subscriptions"];
  //   setSelectedCategory(category);
  //   setValue("category", category); // Update the category value in the form
  // };

  const { allSubscriptions } = useSimStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">{`Product's Category`}</Label>

      <Select
        value={selectedCategory}
        onValueChange={(value: string) => {
          setValue("category", value); // Update form value
          setSelectedCategory(value as unknown as SimHolder["subscriptions"]);
        }}
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder={"Select a category"} />
        </SelectTrigger>
        <SelectContent className="poppins">
          {allSubscriptions.map((category) => (
            <SelectItem
              className="cursor-pointer hover:bg-secondary"
              key={category.label}
              value={category.label}
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
