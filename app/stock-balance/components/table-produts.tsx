import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const ProductTable = () => {
  return (
    <Table className="table-auto">
      <TableCaption>Lista de Produto.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome Produto</TableHead>
          <TableHead>Fabricante</TableHead>
          <TableHead>Estoque Atual</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="focus:bg-neutral-400">
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ProductTable;
