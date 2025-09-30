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
import { ProdutoComEstoqueNumerico } from "@/app/actions/product-actions/get-all-product";
import { formatCurrency } from "@/lib/formatToReal";

interface Props {
  data: ProdutoComEstoqueNumerico[];
}
const ProductTable = ({ data }: Props) => {
  return (
    <Table className="table-auto">
      <TableCaption>Lista de Produto.</TableCaption>
      <TableHeader>
        <TableRow className="bg-gray-200">
          <TableHead>Editar</TableHead>
          <TableHead>codigo</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Estoque</TableHead>
          <TableHead>preco/custo</TableHead>
          <TableHead>preco/compra</TableHead>
          <TableHead>preco/venda</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>ean</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="focus:bg-neutral-400" key={item.id}>
            <TableCell className="font-medium">
              <UpdateProductDialog id_product={item.id} type="create" />
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.estoque_atual}</TableCell>
            <TableCell>{formatCurrency(item.preco_custo)}</TableCell>
            <TableCell>{formatCurrency(item.preco_compra)}</TableCell>
            <TableCell>{formatCurrency(item.preco_venda)}</TableCell>
            <TableCell>{item.unidade}</TableCell>
            <TableCell>{item.ean}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
