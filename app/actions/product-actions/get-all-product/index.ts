"use server";
import { Produto, produtos } from "@/db/schema";
import { db } from "@/db/index";
import { SQL, and, ilike } from "drizzle-orm";
import { ProdutoBalanceComEstoqueNumerico } from "../get-product-updates";

export type ProdutoComEstoqueNumerico = Omit<Produto, "estoque_atual"> & {
  estoque_atual: number;
};

export const getProductBy = async (filters?: {
  nome: string;
}): Promise<ProdutoComEstoqueNumerico[]> => {
  const { nome } = filters || {};
  const conditions: (SQL | undefined)[] = [];

  if (nome) {
    conditions.push(ilike(produtos.nome, `%${nome}%`));
  }

  const products = await db.query.produtos.findMany({
    where: and(...conditions.filter((c): c is SQL => !!c)),
    limit: 40,
  });

  return products.map((p) => ({
    ...p,
    estoque_atual: parseFloat(p.estoque_atual),
  }));
};

export const getProductBUpdateByName = async (filters?: {
  nome: string;
}): Promise<ProdutoBalanceComEstoqueNumerico[]> => {
  const { nome } = filters || {};
  const conditions: (SQL | undefined)[] = [];

  if (nome) {
    conditions.push(ilike(produtos.nome, `%${nome}%`));
  }

  const products = await db.query.produtos_balance.findMany({
    where: and(...conditions.filter((c): c is SQL => !!c)),
    limit: 40,
  });

  return products.map((p) => ({
    ...p,
    estoque_atual: parseFloat(p.estoque_atual),
  }));
};
