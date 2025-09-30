"use server";

import { db } from "@/db";

export const getProductById = async (id: number) => {
  const product = await db.query.produtos.findFirst({
    where: (produtos, { eq }) => eq(produtos.id, id),
  });
  return product;
};
