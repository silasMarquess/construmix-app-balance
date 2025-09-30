"use server";

import { db } from "@/db";
import { ProdutoBalance } from "@/db/schema";

export type ProdutoBalanceComEstoqueNumerico = Omit<
  ProdutoBalance,
  "estoque_atual"
> & {
  estoque_atual: number;
};
export const getProductAllProductBalance = async (): Promise<
  ProdutoBalanceComEstoqueNumerico[]
> => {
  const products = await db.query.produtos_balance.findMany({
    limit: 40,
  });

  return products.map((p) => ({
    ...p,
    estoque_atual: parseFloat(p.estoque_atual),
  }));
};
