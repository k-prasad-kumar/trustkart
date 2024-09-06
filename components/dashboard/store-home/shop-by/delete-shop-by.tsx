"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteShopBy } from "@/lib/actions/home-actions";

export const DeleteShopBy = ({ id }: { id: string }) => {
  const [isPending, startTransistion] = useTransition();
  const router = useRouter();

  const deleteHeroHandler = (formData: FormData) => {
    const id = formData.get("id") as string;

    startTransistion(() => {
      deleteShopBy(id)
        .then((data) => {
          if (data?.success) {
            toast.success(data?.success);
            router.push("/dashboard/store-home/shop-by");
          } else {
            toast.error(data?.error);
          }
        })
        .catch((error) => {});
    });
  };
  return (
    <div className="flex w-full h-[calc(100vh-4rem)] justify-center items-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">
            Are you absolutely sure?
          </CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this Shop
            By and remove your data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-8">
          <Button variant={"ghost"} asChild>
            <Link href={`/dashboard/store-home/shop-by`}>Cancel </Link>
          </Button>
          {isPending && isPending === true ? (
            <Button variant="destructive" disabled={isPending}>
              <>
                <Loader2Icon className="animate-spin mr-2" size={16} />
                <span>Please wait</span>
              </>
            </Button>
          ) : (
            <form action={deleteHeroHandler}>
              <input type="hidden" name="id" value={id} autoComplete="off" />

              <Button variant="destructive">Delete Shop By</Button>
            </form>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
