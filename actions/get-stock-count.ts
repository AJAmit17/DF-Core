import prismadb from "@/lib/prisma";

export const getStockCount = async (companyId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      companyId,
      isArchived: false,
    }
  });

  return stockCount;
};
