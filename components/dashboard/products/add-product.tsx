"use client";
import * as React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/lib/schemas/product-schema";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { CldUploadButton } from "next-cloudinary";
import { Categories } from "@/lib/data/categories-data";
import Image from "next/image";
import { addProduct } from "@/lib/actions/product-actions";
import MultiText from "./multi-text";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { deleteImageCloudinary } from "@/lib/actions/delete-image-cloudinary";

export const AddProductForm = () => {
  const [images, setImages] = useState<{ url: string; public_id: string }[]>(
    []
  );

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      brand: "",
      color: "",
      sellingPrice: 0,
      retailPrice: 0,
      discount: 0,
      category: "MEN" || "WOMEN" || "KIDS",
      subCategory: "",
      productDetails: "",
      productCode: "",
      tags: [],
      sizes: [{ size: "", stock: 0 }],
      images: [{ url: "", public_id: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "sizes",
    control: form.control,
  });

  const removeImage = (idx: number) => {
    deleteImageCloudinary(images[idx].public_id);

    let res = images?.filter((_, i) => i != idx);
    setImages(res);
  };

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    const modifySlug: string = values.slug.replaceAll(" ", "-");
    const lowerSlug = modifySlug.toLowerCase();

    values.slug = lowerSlug;
    values.images = images;

    startTransition(() => {
      addProduct(values)
        .then((data: any) => {
          if (data?.error) {
            setError(data?.error);
            setSuccess(undefined);
          } else {
            setError(undefined);
            setSuccess(data?.success);
            form.reset();
            setImages([]);
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
          <CardTitle className="text-2xl font-medium">Add Product</CardTitle>
          <CardDescription>Fill in the product details</CardDescription>
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
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* brand & color */}
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
                  name="color"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* prices */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel>Selling Price</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="retailPrice"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel>Retail Price</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/3">
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* category & subCategory */}
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MEN">Men</SelectItem>
                            <SelectItem value="WOMEN">Women</SelectItem>
                            <SelectItem value="KIDS">Kids</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Sub Category</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Sub Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Categories.map((category) => (
                              <SelectItem value={category} key={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* product details */}
              <FormField
                control={form.control}
                name="productDetails"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Details</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Name, brand, category, color, size, price, discount etc."
                        value={field.value}
                        onChange={(tag) =>
                          field.onChange([...field.value, tag])
                        }
                        onRemove={(tagToRemove) =>
                          field.onChange([
                            ...field.value.filter((tag) => tag !== tagToRemove),
                          ])
                        }
                        isPending={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="text-sm font-medium">Sizes & Stock</h2>
              {fields.map((field, index) => {
                return (
                  <div
                    className="flex flex-col md:flex-row gap-2 items-start w-full"
                    key={field.id}
                  >
                    <div className="flex w-full gap-2 md:w-5/6">
                      <FormField
                        control={form.control}
                        name={`sizes.${index}.size`}
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormControl>
                              <Input
                                placeholder="Size"
                                {...form.register(`sizes.${index}.size`)}
                                {...field}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizes.${index}.stock`}
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Stock"
                                {...form.register(`sizes.${index}.stock`)}
                                {...field}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-1/6 flex gap-2 md:justify-around">
                      <Button
                        type="button"
                        onClick={() => append({ size: "", stock: 0 })}
                        variant="link"
                        disabled={isPending}
                        className="border"
                      >
                        <PlusIcon />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="link"
                        disabled={isPending}
                        className="border"
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* preview images start */}
              <div className="flex gap-2">
                {images?.map((image, idx) => (
                  <div
                    key={image.public_id}
                    className="relative w-[100px] h-[140px] flex"
                  >
                    <div className="absolute top-0 right-0 z-10">
                      <Button
                        type="button"
                        onClick={() => removeImage(idx)}
                        size="sm"
                        className="bg-red-500 p-2"
                        disabled={isPending}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                    <Image
                      src={image.url}
                      alt="collection"
                      className="object-cover rounded-lg"
                      fill
                    />
                  </div>
                ))}
              </div>
              {/* preview images end */}

              <h2 className="text-sm font-medium">Product Images</h2>
              <FormField
                control={form.control}
                name="images"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CldUploadButton
                        uploadPreset="trustkart"
                        onSuccess={(result: any) => {
                          setImages((prev) => [
                            ...prev,
                            {
                              url: result?.info?.secure_url,
                              public_id: result?.info?.public_id,
                            },
                          ]);
                        }}
                        className="px-4 py-2 w-full shadow rounded border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Separator />
              <Button type={"submit"} className="w-full mt-4">
                Add Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
