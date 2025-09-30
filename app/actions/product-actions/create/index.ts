"use server";

import { db } from "@/db";
import { produtos_balance } from "@/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { produtoCreateSchema } from "./schema";

export const ProductInsert = async (
  productBody: z.infer<typeof produtoCreateSchema>
) => {
  await db.insert(produtos_balance).values(productBody);
};
