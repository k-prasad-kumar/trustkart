import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  slug: z.string().min(1, "Slug is required").trim(),
  brand: z.string().min(1, "Brand is required").trim(),
  color: z.string().min(1, "Color is required").trim(),
  sellingPrice: z.coerce.number().min(1, "Selling price is required"),
  retailPrice: z.coerce.number().min(1, "Retail price is required"),
  discount: z.coerce.number().min(1, "Discount is required"),
  category: z.enum(["MEN", "WOMEN", "KIDS"]),
  subCategory: z.string().min(1, "Select Sub category"),
  productDetails: z.string().min(1, "Product details required").trim(),
  productCode: z.string().min(1, "Product code is required").trim(),
  tags: z.array(z.string()).min(1, "At least 4 tags are required"),
  sizes: z
    .array(
      z.object({
        size: z.string().min(1, "Size required."),
        stock: z.coerce.number().min(1, "Quantity is required"),
      })
    )
    .min(1),
  images: z
    .array(z.object({ url: z.string(), public_id: z.string() }))
    .optional(),
});

export const SearchSchema = z.object({
  query: z.string().min(3, "Enter at least 3 characters").trim(),
});

export const HeroSchema = z.object({
  brand: z.string().min(1, "Brand is required").trim(),
  image: z.string().min(1, "Image url is required").trim(),
  headline: z.string().min(1, "Headline is required").trim(),
  subHeadline: z.string().min(1, "Sub Headline is required").trim(),
  link: z.string().min(1, "Link is required").trim(),
  href: z.string().min(1, "Href is required").trim(),
});

export const ShopBySchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  image: z.string().min(1, "Image url is required").trim(),
  discount: z.string().min(1, "Discount is required").trim(),
  type: z.string().min(1, "Type is required").trim(),
  href: z.string().min(1, "Href is required").trim(),
});
