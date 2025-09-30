"use server";

import { db } from "@/db";
import { produtos_balance } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateProductBalanced = async (
  id_product: number,
  productBodyUpdate: { estoque_atual: string }
) => {
  await db
    .update(produtos_balance)
    .set({
      estoque_atual: String(productBodyUpdate.estoque_atual),
    })
    .where(eq(produtos_balance.id, id_product));
};
