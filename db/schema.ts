import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const produtos = pgTable("produtos", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  estoque_atual: numeric("estoque_atual", {
    precision: 10,
    scale: 2,
  }).notNull(),
  unidade: varchar("unidade", { length: 25 }).notNull().default("UN"),
  modelo: varchar("modelo", { length: 30 }).notNull(),
  ean: varchar("ean", { length: 25 }).notNull(),
  codigo_fabricante: varchar("codigo_fabricante", { length: 25 }).notNull(),
});

export type Produto = typeof produtos._.inferSelect; // tipo para SELECT
export type NovoProduto = typeof produtos._.inferInsert; // tipo para INSERT
