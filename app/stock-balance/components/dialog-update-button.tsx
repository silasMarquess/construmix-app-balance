import { getProductById } from "@/app/actions/product-actions/findById";
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

export interface Props {
  id_product: number;
}

const productUpdate = z.object({
  estoque_atual: z
    .string({ message: "Estoque invalido" })
    .min(1, "valor nao pode ser menor que 1")
    .refine((e) => !isNaN(Number(e)), {
      message: "Estoque invalido",
    }),
});

export const UpdateProductDialog = ({ id_product }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    // Chave de query única para este produto específico
    queryKey: ["product", id_product],
    queryFn: () => getProductById(id_product),
    enabled: !!id_product, // A query só será executada se id_product existir
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof productUpdate>) => {
      return await updateProduct(id_product, values);
    },
    onError: (error) => {
      toast.error("Falha ao atualizar o estoque.");
      console.error(error);
    },
    onSuccess: (data) => {
      toast.success("Estoque do produto atualizado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id_product] });
      //setIsOpen(false);
    },
  });

  const form = useForm<z.infer<typeof productUpdate>>({
    resolver: zodResolver(productUpdate),
    defaultValues: {
      estoque_atual: product?.estoque_atual || "0",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({ estoque_atual: product.estoque_atual || "0" });
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

  const onSubmit = (data: z.infer<typeof productUpdate>) => {
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full hover:bg-blue-500" size={"sm"}>
          Edit <Pencil />
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
              <FormField
                control={form.control}
                name="estoque_atual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Novo Estoque Atualizado</FormLabel>
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
