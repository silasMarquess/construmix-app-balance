import z from "zod";

export const produtoCreateSchema = z.object({
  nome: z.string(),
  estoque_atual: z
    .string()
    .min(1)
    .refine((value) => !isNaN(Number(value))),
  preco_custo: z.string(),
  preco_compra: z.string().refine((value) => !isNaN(Number(value))),
  preco_venda: z.string(),
});
