"use server";

import { db } from "@/db";
import { produtos_balance } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteProduct = async (id_product: number) => {
  try {
    await db
      .delete(produtos_balance)
      .where(eq(produtos_balance.id, id_product));
  } catch (e) {
    console.log(e);
  }
};
