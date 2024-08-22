"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProductsSort = () => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const sortHandler = (type: string) => {
    if (type === "lowToHigh") {
      params.set("sort", "low-to-high");
      params.set("page", "1");
      replace(`${pathName}?${params.toString()}`);
    } else if (type === "highToLow") {
      params.set("sort", "high-to-low");
      params.set("page", "1");
      replace(`${pathName}?${params.toString()}`);
    } else if (type === "better discount") {
      params.set("sort", "better discount");
      params.set("page", "1");
      replace(`${pathName}?${params.toString()}`);
    } else {
      params.set("sort", "recommended");
      params.set("page", "1");
      replace(`${pathName}?${params.toString()}`);
    }
  };
  return (
    <Select onValueChange={sortHandler}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Sort by: Recommended" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recommended">Recommended</SelectItem>
        <SelectItem value="better discount">Better Discount</SelectItem>
        <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
        <SelectItem value="highToLow">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};
