"use client";

import * as React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { ShopBySchema } from "@/lib/schemas/product-schema";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { updateShopBy } from "@/lib/actions/home-actions";
import { ShopByInterface } from "@/lib/types";

export const UpdateShopByForm = ({
  shopBy,
}: {
  shopBy: ShopByInterface | null;
}) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ShopBySchema>>({
    resolver: zodResolver(ShopBySchema),
    defaultValues: {
      image: shopBy?.image || "",
      title: shopBy?.title || "",
      discount: shopBy?.discount || "",
      type: shopBy?.type || "",
      href: shopBy?.href || "",
    },
  });

  const onSubmit = (values: z.infer<typeof ShopBySchema>) => {
    startTransition(() => {
      updateShopBy(shopBy?.id!, values)
        .then((data: any) => {
          if (data?.error) {
            setError(data?.error);
            setSuccess(undefined);
          } else {
            setError(undefined);
            setSuccess(data?.success);
            form.reset();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  };

  return (
    <div className="w-full flex justify-center py-4">
      <Card className="w-full md:w-3/4 lg:w-2/3">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">Update Shop By</CardTitle>
          <CardDescription>Fill in the Shop By details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              {/* title  & image */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Image Url</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* discount & type */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="href"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Link Href</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />
              <Separator />
              <Button type={"submit"} className="w-full mt-4">
                Update Shop By
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
