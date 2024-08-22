"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export const PaginationPage = ({
  count,
  itemsPerPage,
}: {
  count: number;
  itemsPerPage: number;
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const page = searchParams.get("page") || "1";
  const params = new URLSearchParams(searchParams);

  const hasPrev: boolean = itemsPerPage * (Number(page) - 1) > 0;
  const hasNext: boolean =
    itemsPerPage * (Number(page) - 1) + itemsPerPage < count;
  const handlePagination = (type: string) => {
    type === "prev"
      ? params.set("page", (Number(page) - 1).toString())
      : params.set("page", (Number(page) + 1).toString());

    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="w-full my-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={!hasPrev}
              variant={"ghost"}
              onClick={() => handlePagination("prev")}
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          {hasNext && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <Button
              disabled={!hasNext}
              variant={"ghost"}
              onClick={() => handlePagination("next")}
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
