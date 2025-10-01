"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, Loader2Icon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatToReal";
import { getProductAllProductBalance } from "@/app/actions/product-actions/get-product-updates";
import ProductTableUpdates from "../components/updates_products";
import { calcSubtotal } from "../helper/calcul_subtotal";
import { getProductBUpdateByName } from "@/app/actions/product-actions/get-all-product";
import { deleteProduct } from "@/app/actions/product-actions/delete";

const StockBalancePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms de atraso

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products-balance", debouncedSearchTerm],
    queryFn: async () =>
      await getProductBUpdateByName({ nome: debouncedSearchTerm }),
  });

  const totalCusto = products?.reduce(
    (total, product) =>
      total +
      calcSubtotal(product?.estoque_atual, Number(product?.preco_custo)),
    0
  );

  const totalVenda = products?.reduce(
    (total, product) =>
      total +
      calcSubtotal(product?.estoque_atual, Number(product?.preco_venda)),
    0
  );

  if (isError) return <div>Erro ao buscar produtos</div>;

  if (isLoading)
    return (
      <div>
        {" "}
        <Loader2Icon className="animate-spin h-5 w-5" />
        Loading
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full items-center p-2 bg-white/65  space-y-2 ">
      <Card className="flex flex-col w-full h-auto max-w-sm items-center justify-center shadow-2xl ">
        <CardContent className="flex flex-col items-center space-y-3">
          <CardTitle>PRODUTOS ATUALIZADOS</CardTitle>
          <div className="flex w-full flex-row max-w-sm items-center space-x-2 bg-white shadow-2xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por nome..."
                className="pl-10 bg-yellow-300/40"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col overflow-auto w-full grow p-2 bg-white rounded-2xl shadow-2xl space-y-1.5">
        <div className="flex flex-row w-full items-center justify-between space-x-2">
          <Button
            size={"sm"}
            className="font-bold text-white/80 shadow-2xl"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon /> Voltar
          </Button>
          <div className="font-bold">(Produtos/Atualizados)</div>
        </div>
        <div className="flex flex-col overflow-auto p-0.5 w-full h-full">
          {" "}
          {isLoading && <p className="text-center">Buscando produtos...</p>}
          {!isLoading && products?.length === 0 && (
            <p className="text-center">Nenhum produto encontrado.</p>
          )}
          <ProductTableUpdates data={products || []} />
        </div>
      </div>
      <div className="w-full h-[13rem]">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Resumo de Valores</CardTitle>
            <hr className="w-full"></hr>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Total Itens:</span>
              <span className="text-red-600">{products?.length || 0}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Custo:</span>
              <span className="text-red-600">
                {formatCurrency(totalCusto || 0)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Venda:</span>
              <span className="text-green-600">
                {formatCurrency(totalVenda || 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockBalancePage;
