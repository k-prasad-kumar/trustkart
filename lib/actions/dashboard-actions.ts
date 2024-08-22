"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const updateProductCount = async () => {
  try {
    const existingDashboard = await prisma.dashboard.findUnique({
      where: {
        dashboardId: "trustkart-dashboard",
      },
    });

    await prisma.dashboard.update({
      where: {
        id: existingDashboard?.id,
      },
      data: {
        totalProducts: existingDashboard?.totalProducts! + 1,
        totalSales: existingDashboard?.totalSales!,
        totalRevenue: existingDashboard?.totalRevenue!,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Product count updated" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const updateSalesCount = async (saleTotal: number) => {
  try {
    const existingDashboard = await prisma.dashboard.findUnique({
      where: {
        dashboardId: "trustkart-dashboard",
      },
    });

    await prisma.dashboard.update({
      where: {
        id: existingDashboard?.id,
      },
      data: {
        totalProducts: existingDashboard?.totalProducts!,
        totalSales: existingDashboard?.totalSales! + 1,
        totalRevenue: existingDashboard?.totalRevenue! + saleTotal,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Sales updated" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deleteProductCount = async () => {
  try {
    const existingDashboard = await prisma.dashboard.findUnique({
      where: {
        dashboardId: "trustkart-dashboard",
      },
    });

    await prisma.dashboard.update({
      where: {
        id: existingDashboard?.id,
      },
      data: {
        totalProducts: existingDashboard?.totalProducts! - 1,
        totalSales: existingDashboard?.totalSales!,
        totalRevenue: existingDashboard?.totalRevenue!,
      },
    });
    revalidatePath("/dashboard");
    return { success: "Product count updated" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const fetchDashboard = async () => {
  try {
    const dashboard = await prisma.dashboard.findUnique({
      where: {
        dashboardId: "trustkart-dashboard",
      },
    });
    return dashboard;
  } catch (error) {
    return null;
  }
};
