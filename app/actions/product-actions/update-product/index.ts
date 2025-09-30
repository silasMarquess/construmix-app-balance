"use server";

import { db } from "@/db";
import { produtos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateProduct = async (
  id_product: number,
  productBodyUpdate: { estoque_atual: string }
) => {
  await db
    .update(produtos)
    .set({
      estoque_atual: String(productBodyUpdate.estoque_atual),
    })
    .where(eq(produtos.id, id_product));
};
