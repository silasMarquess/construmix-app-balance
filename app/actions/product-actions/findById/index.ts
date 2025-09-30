"use server";

import { db } from "@/db";
import { produtos_balance } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProductById = async (id: number) => {
  const product = await db.query.produtos.findFirst({
    where: (produtos, { eq }) => eq(produtos.id, id),
  });
  return product;
};

export const getProductBalanceById = async (id: number) => {
  const product = await db.query.produtos_balance.findFirst({
    where: eq(produtos_balance.id, id),
  });
  return product;
};
