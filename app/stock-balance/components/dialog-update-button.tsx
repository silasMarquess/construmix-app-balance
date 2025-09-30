import {
  getProductBalanceById,
  getProductById,
} from "@/app/actions/product-actions/findById";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { updateProduct } from "@/app/actions/product-actions/update-product";
import { toast } from "sonner";
import { produtoCreateSchema } from "@/app/actions/product-actions/create/schema";
import { ProductInsert } from "@/app/actions/product-actions/create";
import { updateProductBalanced } from "@/app/actions/product-actions/product-balance-stock-update";

export interface Props {
  id_product: number;
  type: "update" | "create";
}

const productUpdate = z.object({
  estoque_atual: z
    .string({ message: "Estoque invalido" })
    .min(1, "valor nao pode ser menor que 1")
    .refine((e) => !isNaN(Number(e)), {
      message: "Estoque invalido",
    }),
});

export const UpdateProductDialog = ({ id_product, type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    // Chave de query única para este produto específico
    queryKey: ["product", id_product],
    queryFn: () =>
      type === "create"
        ? getProductById(id_product)
        : getProductBalanceById(id_product),
    enabled: !!id_product, // A query só será executada se id_product existir
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof produtoCreateSchema>) => {
      return type === "update"
        ? await updateProductBalanced(id_product, values)
        : await ProductInsert(values);
    },
    onError: (error) => {
      toast.error("Falha ao atualizar o estoque.");
      console.error(error);
    },
    onSuccess: (data) => {
      toast.success("Estoque do produto atualizado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-balance"] });
      queryClient.invalidateQueries({ queryKey: ["product", id_product] });
      //setIsOpen(false);
    },
  });

  const form = useForm<z.infer<typeof produtoCreateSchema>>({
    resolver: zodResolver(produtoCreateSchema),
    defaultValues: {
      estoque_atual: product?.estoque_atual || "0",
      preco_venda: product?.preco_venda || "0",
      preco_compra: product?.preco_compra || "0",
      preco_custo: product?.preco_custo || "0",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        nome: product.nome || "0",
        estoque_atual: product?.estoque_atual || "0",
        preco_venda: product?.preco_venda || "0",
        preco_compra: product?.preco_compra || "0",
        preco_custo: product?.preco_custo || "0",
      });
    } else {
      form.reset(); // Limpa o formulário se o produto não for encontrado ou enquanto carrega
    }
  }, [product, form]);

  if (isError) return <div>Erro ao buscar produto</div>;

  if (isLoading)
    return (
      <div>
        {" "}
        <Loader2Icon className="animate-spin h-5 w-5" />
        Loading
      </div>
    );

  // Adicionado para tratar o caso em que o produto não é encontrado
  if (!product && !isLoading) {
    return (
      <Button
        variant="destructive"
        size="icon"
        className="rounded-full"
        disabled
      >
        <Pencil />
      </Button>
    );
  }

  const onSubmit = async (data: z.infer<typeof produtoCreateSchema>) => {
    console.log(data);
    mutate(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-primary" size={"icon"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualização de Estoque</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full w-full p-2 space-y-1.5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 md:w-auto w-full border rounded-md p-2"
            >
              <FormItem>
                <FormLabel>Descrição do Produto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="bg-red-300/80 border text-black"
                    readOnly={true}
                    value={product?.nome}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Estoque Atual</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="bg-red-300/80 border text-black"
                    readOnly={true}
                    value={product?.estoque_atual}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Preco Custo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="bg-red-300/80 border text-black"
                    readOnly={true}
                    value={product?.preco_custo}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Preco Compra</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="bg-red-300/80 border text-black"
                    readOnly={true}
                    value={product?.preco_compra}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Preco Venda</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="bg-red-300/80 border text-black"
                    readOnly={true}
                    value={product?.preco_venda}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="estoque_atual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Informe Estoque Atualizado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="informe o novo estoque"
                        {...field}
                        className="bg-yellow-100/70 border text-red font-semibold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Atualizar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
