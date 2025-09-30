import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateProductDialog } from "./dialog-update-button";
import { ProdutoBalanceComEstoqueNumerico } from "@/app/actions/product-actions/get-product-updates";
import { formatCurrency } from "@/lib/formatToReal";

interface Props {
  data: ProdutoBalanceComEstoqueNumerico[];
}

const ProductTableUpdates = ({ data }: Props) => {
  return (
    <Table className="table-auto">
      <TableCaption>Lista de Produto.</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead>Editar</TableHead>
          <TableHead>id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Estoque Atual</TableHead>
          <TableHead>preco_custo</TableHead>
          <TableHead>preco_compra</TableHead>
          <TableHead>preco_venda</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="focus:bg-neutral-400" key={item.id}>
            <TableCell className="font-medium">
              <UpdateProductDialog id_product={item.id} />
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.estoque_atual}</TableCell>
            <TableCell>{formatCurrency(item.preco_custo)}</TableCell>
            <TableCell>{formatCurrency(item.preco_compra)}</TableCell>
            <TableCell>{formatCurrency(item.preco_venda)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTableUpdates;
