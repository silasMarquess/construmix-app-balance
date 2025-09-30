CREATE TABLE "produtos_balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"estoque_atual" numeric(14, 2) NOT NULL,
	"preco_compra" numeric(14, 2) NOT NULL,
	"preco_venda" numeric(14, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "produtos" ALTER COLUMN "estoque_atual" SET DATA TYPE numeric(14, 2);--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "preco_compra" numeric(14, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "produtos" DROP COLUMN "modelo";--> statement-breakpoint
ALTER TABLE "produtos" DROP COLUMN "codigo_fabricante";