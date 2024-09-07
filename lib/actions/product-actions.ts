"use server";

import * as z from "zod";
import { PrismaClient } from "@prisma/client";
import { ProductSchema } from "../schemas/product-schema";
import { revalidatePath } from "next/cache";
import { deleteImageCloudinary } from "./delete-image-cloudinary";
import { ProductInterface } from "../types";
import { deleteProductCount, updateProductCount } from "./dashboard-actions";

const prisma = new PrismaClient();
const productsPerPage: number = parseInt(process.env.PRODUCTS_PER_PAGE!);

export const addProduct = async (values: z.infer<typeof ProductSchema>) => {
  const validatedData = ProductSchema.safeParse(values);
  if (!validatedData.success) return { error: "Invalid Fields" };

  const {
    name,
    slug,
    brand,
    color,
    sellingPrice,
    retailPrice,
    discount,
    category,
    subCategory,
    productDetails,
    tags,
    sizes,
    images,
  } = validatedData.data;

  try {
    const imagesLength: number = images?.length!;

    if (!validatedData?.data?.images || imagesLength < 4)
      return { error: "Upload at least 4 images" };

    const existingProduct = await prisma.product.findFirst({ where: { slug } });

    if (existingProduct) return { error: "Product already exists" };

    tags?.unshift(
      name.toLowerCase(),
      brand.toLowerCase(),
      color.toLowerCase(),
      String(sellingPrice).toLowerCase(),
      String(discount).toLowerCase(),
      category.toLowerCase(),
      subCategory.toLowerCase()
    );

    // creating searchTags using tags
    const searchTags = tags
      ?.map((tag: string) => tag.trim().toLowerCase())
      .join(" ")!;

    await prisma.product.create({
      data: {
        name,
        slug,
        brand,
        color,
        sellingPrice,
        retailPrice,
        discount,
        category,
        subCategory,
        productDetails,
        tags,
        sizes,
        images,
        searchTags,
      },
    });

    await updateProductCount();

    revalidatePath("/dashboard/products");
    revalidatePath("/");

    return { success: "Product added successfully" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateProduct = async (
  id: string,
  values: z.infer<typeof ProductSchema>
) => {
  const validatedData = ProductSchema.safeParse(values);
  if (!validatedData.success) return { error: "Invalid Fields" };

  let {
    name,
    slug,
    brand,
    color,
    sellingPrice,
    retailPrice,
    discount,
    category,
    subCategory,
    productDetails,
    tags,
    sizes,
    images,
  } = validatedData.data;

  try {
    const imagesLength: number = images?.length!;

    if (!validatedData?.data?.images || imagesLength < 4)
      return { error: "Upload at least 4 images" };

    tags = [""];

    tags?.unshift(
      name.toLowerCase(),
      brand.toLowerCase(),
      color.toLowerCase(),
      String(sellingPrice).toLowerCase(),
      String(discount).toLowerCase(),
      category.toLowerCase(),
      subCategory.toLowerCase()
    );

    // creating searchTags using tags
    const searchTags = tags
      ?.map((tag: string) => tag.trim().toLowerCase())
      .join(" ")!;

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        brand,
        color,
        sellingPrice,
        retailPrice,
        discount,
        category,
        subCategory,
        productDetails,
        tags,
        sizes,
        images,
        updatedAt: new Date(),
        searchTags,
      },
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/");

    return { success: "Product updated successfully" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const product = await prisma.product.findFirst({ where: { id } });
    if (!product) return { error: "Product not found" };

    if (product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        const image = product.images[i];
        deleteImageCloudinary(image.public_id);
      }
    }
    await prisma.product.delete({ where: { id } });

    await deleteProductCount();

    revalidatePath("/dashboard/products");
    return { success: "Product deleted successfully" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchProducts = async () => {
  try {
    const res = await prisma.product.findMany();
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const res = await prisma.product.findFirst({ where: { id } });
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    const res = await prisma.product.findFirst({
      where: { slug },
      include: { reviews: true },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const fetchProductsByQuery = async (q: string, page: string) => {
  try {
    const totalProducts = await prisma.product.findMany({
      where: { searchTags: { contains: q, mode: "insensitive" } },
    });
    const products: ProductInterface[] = await prisma.product.findMany({
      where: { searchTags: { contains: q, mode: "insensitive" } },
      take: productsPerPage,
      skip: productsPerPage * (Number(page) - 1),
    });
    const count: number = totalProducts.length;
    return { products, count };
  } catch (error) {
    return null;
  }
};

export const fetchProductsByTags = async (tags: string[], page: string) => {
  try {
    const totalProducts = await prisma.product.findMany({
      where: {
        tags: {
          hasEvery: tags,
        },
      },
    });
    const products: ProductInterface[] = await prisma.product.findMany({
      where: {
        tags: {
          hasEvery: tags,
        },
      },
      take: productsPerPage,
      skip: productsPerPage * (Number(page) - 1),
    });
    const count: number = totalProducts.length;
    return { products, count };
  } catch (error) {
    return null;
  }
};

export const fetchRelatedProducts = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({ where: { slug } });
    const relatedProducts = await prisma.product.findMany({
      where: {
        category: product?.category,
        subCategory: product?.subCategory,
        id: { not: product?.id },
      },
      take: 20,
    });
    return relatedProducts;
  } catch (error) {
    return null;
  }
};

export const fetchRecentProducts = async () => {
  try {
    const recentProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return recentProducts;
  } catch (error) {
    return null;
  }
};

export const updateProductStock = async (
  id: string,
  size: string,
  quantity: number
) => {
  try {
    const product = await prisma.product.findFirst({ where: { id } });
    if (!product) return { error: "Product not found" };

    let sizes = product.sizes.map((s) => {
      if (s.size === size) return { size: s.size, stock: s.stock - quantity };

      return s;
    });

    await prisma.product.update({ where: { id }, data: { sizes } });
    return { success: "Product stock updated successfully" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
