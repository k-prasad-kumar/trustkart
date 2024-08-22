"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ProductFilter = ({
  brands,
  colors,
}: {
  brands: (string | undefined)[] | undefined;
  colors: (string | undefined)[] | undefined;
}) => {
  const [checkedBrand, setCheckedBrand] = useState<string>("");
  const [checkedColor, setCheckedColor] = useState<string>("");

  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const addBrand = (value: string | undefined) => {
    setCheckedBrand(value!);
    params.set("brand", value!.toString());
    params.set("page", "1");
    replace(`${pathName}?${params.toString()}`);
  };

  const removeBrand = (value: string | undefined) => {
    setCheckedBrand("");
    params.delete("brand", value);
    replace(`${pathName}?${params.toString()}`);
  };

  const addColor = (value: string | undefined) => {
    setCheckedColor(value!);
    params.set("color", value!.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  const removeColor = (value: string | undefined) => {
    setCheckedColor("");
    params.delete("color", value);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <div className="space-y-2">
        <h1 className="mt-4 mb-2 text-xs font-semibold">BRAND</h1>
        {brands &&
          brands.map((item) => (
            <div className="flex items-center space-x-3" key={item}>
              <Checkbox
                id="terms"
                checked={checkedBrand === item}
                onCheckedChange={(checked) =>
                  checked ? addBrand(item) : removeBrand(item)
                }
              />
              <p className="text-xs tracking-wider">{item}</p>
            </div>
          ))}
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <h1 className="mt-4 mb-2 text-xs font-semibold">COLOR</h1>
        {colors &&
          colors.map((item) => (
            <div className="flex items-center space-x-3" key={item}>
              <Checkbox
                id="terms"
                checked={checkedColor === item}
                onCheckedChange={(checked) =>
                  checked ? addColor(item) : removeColor(item)
                }
              />
              <p className="text-xs capitalize tracking-wider">{item}</p>
            </div>
          ))}
      </div>
    </>
  );
};
