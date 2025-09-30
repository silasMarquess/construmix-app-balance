CREATE TABLE "produtos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"estoque_atual" numeric(10, 2) NOT NULL
);
