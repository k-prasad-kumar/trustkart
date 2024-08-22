"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Search = ({ placeHolder }: { placeHolder: string }) => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      e.target.value.length > 2 &&
        params.set("q", e.target.value.toLowerCase());
      params.set("page", "1");
    } else {
      params.delete("q");
    }

    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <Input
        type="text"
        placeholder={placeHolder}
        className="w-1/2 md:w-1/3"
        onChange={handleSearch}
      />
    </>
  );
};
