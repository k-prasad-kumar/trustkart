"use server";

"use server";

import * as z from "zod";
import { PrismaClient } from "@prisma/client";
import { HeroSchema, ShopBySchema } from "../schemas/product-schema";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const addHero = async (values: z.infer<typeof HeroSchema>) => {
  try {
    await prisma.hero.create({ data: values });
    revalidatePath("/");
    return { success: "Hero added successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const addShopBy = async (values: z.infer<typeof ShopBySchema>) => {
  try {
    await prisma.shopBy.create({ data: values });
    revalidatePath("/");
    return { success: "Shop By added successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateHero = async (
  id: string,
  values: z.infer<typeof HeroSchema>
) => {
  try {
    await prisma.hero.update({ where: { id }, data: values });
    revalidatePath("/");
    return { success: "Hero updated successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateShopBy = async (
  id: string,
  values: z.infer<typeof ShopBySchema>
) => {
  try {
    await prisma.shopBy.update({ where: { id }, data: values });
    revalidatePath("/");
    return { success: "Shop By updated successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteHero = async (id: string) => {
  try {
    await prisma.hero.delete({ where: { id } });
    revalidatePath("/");
    return { success: "Hero deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteShopBy = async (id: string) => {
  try {
    await prisma.shopBy.delete({ where: { id } });
    revalidatePath("/");
    return { success: "Shop By deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchHero = async () => {
  try {
    const hero = await prisma.hero.findMany();
    return hero;
  } catch (error) {
    return null;
  }
};

export const fetchHeroById = async (id: string) => {
  try {
    const hero = await prisma.hero.findUnique({
      where: {
        id,
      },
    });
    return hero;
  } catch (error) {
    return null;
  }
};

export const fetchShopBy = async () => {
  try {
    const shopBy = await prisma.shopBy.findMany();
    return shopBy;
  } catch (error) {
    return null;
  }
};

export const fetchShopById = async (id: string) => {
  try {
    const shopBy = await prisma.shopBy.findUnique({
      where: {
        id,
      },
    });
    return shopBy;
  } catch (error) {
    return null;
  }
};

export const fetchShopByType = async (type: string) => {
  try {
    const shopBy = await prisma.shopBy.findMany({
      where: {
        type: type,
      },
    });
    return shopBy;
  } catch (error) {
    return null;
  }
};
