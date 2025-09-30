import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProdutoBalanceComEstoqueNumerico } from "@/app/actions/product-actions/get-product-updates";
import { formatCurrency } from "@/lib/formatToReal";
import { calcSubtotal } from "../helper/calcul_subtotal";
import { UpdateProductDialog } from "./dialog-update-button";

interface Props {
  data: ProdutoBalanceComEstoqueNumerico[];
}

const ProductTableUpdates = ({ data }: Props) => {
  return (
    <Table className="table-auto">
      <TableCaption>{data.length} Produtos Atualizado</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead>*</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Estoque x Preço/Custo</TableHead>
          <TableHead>Estoque x Preço/Venda</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="focus:bg-neutral-400" key={item.id}>
            <TableCell>
              {" "}
              <UpdateProductDialog id_product={item.id} type="update" />
            </TableCell>
            <TableCell>{item.nome}</TableCell>
            <TableCell className="font-semibold text-sm bg-red-300/40">
              {item.estoque_atual} x {item.preco_custo} ={" "}
              {formatCurrency(
                calcSubtotal(item.estoque_atual, Number(item.preco_custo))
              )}
            </TableCell>
            <TableCell className="font-semibold text-sm bg-green-300/40">
              {item.estoque_atual} x {item.preco_venda} ={" "}
              {formatCurrency(
                calcSubtotal(item.estoque_atual, Number(item.preco_venda))
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTableUpdates;
