import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos", {
  id: integer("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  estoque_atual: numeric("estoque_atual", {
    precision: 10,
    scale: 2,
  }).notNull(),
  preco_custo: numeric("preco_custo", {
    precision: 14,
    scale: 2,
  }).notNull(),
  preco_compra: numeric("preco_compra", {
    precision: 14,
    scale: 2,
  }).notNull(),
  preco_venda: numeric("preco_venda", {
    precision: 14,
    scale: 2,
  }).notNull(),
  unidade: varchar("unidade", { length: 25 }).notNull().default("UN"),
  ean: varchar("ean", { length: 25 }).notNull(),
});

export const produtos_balance = pgTable("produtos_balance", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  estoque_atual: numeric("estoque_atual", {
    precision: 10,
    scale: 2,
  }).notNull(),
  preco_custo: numeric("preco_custo", {
    precision: 14,
    scale: 2,
  }).notNull(),
  preco_compra: numeric("preco_compra", {
    precision: 14,
    scale: 2,
  }).notNull(),
  preco_venda: numeric("preco_venda", {
    precision: 14,
    scale: 2,
  }).notNull(),
});

export type Produto = typeof produtos._.inferSelect; // tipo para SELECT
export type NovoProduto = typeof produtos._.inferInsert; // tipo para INSERT
export type ProdutoBalance = typeof produtos_balance._.inferSelect; // tipo para SELECT
