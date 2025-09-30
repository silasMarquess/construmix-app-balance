ALTER TABLE "produtos_balance" ALTER COLUMN "estoque_atual" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "produtos_balance" ADD COLUMN "preco_custo" numeric(14, 2) NOT NULL;