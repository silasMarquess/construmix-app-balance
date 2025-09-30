ALTER TABLE "produtos" ADD COLUMN "unidade" varchar(25) DEFAULT 'UN' NOT NULL;--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "modelo" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "ean" varchar(25) NOT NULL;--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "codigo_fabricante" varchar(25) NOT NULL;