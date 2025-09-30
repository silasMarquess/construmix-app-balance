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
          <TableHead>Nome Produto</TableHead>
          <TableHead>Estoque Atual</TableHead>
          <TableHead>unidade</TableHead>
          <TableHead>modelo</TableHead>
          <TableHead>ean</TableHead>
          <TableHead>codigo_fabricante</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow className="focus:bg-neutral-400" key={item.id}>
            <TableCell className="font-medium">
              <UpdateProductDialog id_product={item.id} />
            </TableCell>
            <TableCell>{item.nome}</TableCell>
            <TableCell>{item.estoque_atual}</TableCell>
            <TableCell>{item.unidade}</TableCell>
            <TableCell>{item.modelo}</TableCell>
            <TableCell>{item.ean}</TableCell>
            <TableCell>{item.codigo_fabricante}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
