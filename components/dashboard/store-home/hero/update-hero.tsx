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
import { HeroSchema } from "@/lib/schemas/product-schema";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { updateHero } from "@/lib/actions/home-actions";
import { HeroInterface } from "@/lib/types";

export const UpdateHeroForm = ({ hero }: { hero: HeroInterface | null }) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof HeroSchema>>({
    resolver: zodResolver(HeroSchema),
    defaultValues: {
      image: hero?.image,
      brand: hero?.brand,
      headline: hero?.headline,
      subHeadline: hero?.subHeadline,
      link: hero?.link,
      href: hero?.href,
    },
  });

  const onSubmit = (values: z.infer<typeof HeroSchema>) => {
    startTransition(() => {
      updateHero(hero?.id!, values)
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
          <CardTitle className="text-2xl font-medium">
            Update Hero Section
          </CardTitle>
          <CardDescription>Fill in the Hero Section details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              {/* name  & slug */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="brand"
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

              {/* headline & sub headline */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Headline</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subHeadline"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Sub Headline</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* link &  href */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Link Title</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Link Href</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />
              <Separator />
              <Button type={"submit"} className="w-full mt-4">
                Update Hero
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
