"use client";

import { deleteProduct } from "@/app/actions/product-actions/delete";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  id_product: number;
}

const ButtonDelete = ({ id_product }: Props) => {
  if (!id_product) throw new Error("id_product is required");

  const queryCliente = useQueryClient();
  const { mutate: productDeleteMutation, isError } = useMutation({
    mutationFn: async () => await deleteProduct(id_product),
    mutationKey: ["product_delete", id_product],

    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["products-balance"] });
      toast.success("Produto deletado com sucesso!");
    },

    onError: (error) => {
      toast.error("Falha ao deletar o produto.");
      console.error(error);
    },
  });

  if (isError) {
    toast.error("Falha ao deletar o produto.");
    return null;
  }

  return (
    <Button
      className="rounded-full"
      size="icon"
      onClick={() => productDeleteMutation()}
    >
      <Trash2Icon />
    </Button>
  );
};

export default ButtonDelete;
