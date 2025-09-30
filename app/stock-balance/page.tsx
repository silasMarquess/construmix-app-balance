"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, Loader2Icon, Search } from "lucide-react";
import ProductTable from "./components/table-produts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductBy } from "../actions/product-actions/get-all-product";
import { useEffect, useState } from "react";
import { getProductById } from "../actions/product-actions/findById";
import { Label } from "@radix-ui/react-label";

const StockBalancePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [productId, setProductId] = useState<number | null>(null);

  // Efeito para criar o "debounce"
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    // A queryKey agora inclui o termo de busca para cache correto
    queryKey: ["products", debouncedSearchTerm],
    queryFn: async () => await getProductBy({ nome: debouncedSearchTerm }),
  });

  const { data: productById, isLoading: isLoadingById } = useQuery({
    // A chave de query agora usa o estado 'productId'
    queryKey: ["product", productId],
    // A queryFn recebe o contexto e extrai o ID da queryKey
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      return getProductById(id as number);
    },
    // A query só será executada se productId não for nulo
    enabled: !!productId,
    // A opção 'select' transforma os dados antes de serem retornados.
    // Aqui, convertemos 'estoque_atual' de string para número.
    select: (data) => {
      if (!data) return undefined;
      return {
        ...data,
        estoque_atual: Number(data.estoque_atual),
      };
    },
  });

  if (isError) return <div>Erro ao buscar produtos</div>;

  if (isLoading)
    return (
      <div>
        {" "}
        <Loader2Icon className="animate-spin h-5 w-5" />
        Loading
      </div>
    );

  // Decide quais dados mostrar na tabela
  const tableData = productById ? [productById] : products || [];

  return (
    <div className="flex flex-col w-full h-full items-center p-2 bg-white/65  space-y-2 ">
      <Card className="flex flex-col w-full h-auto max-w-sm items-center justify-center shadow-2xl ">
        <CardContent className="flex flex-col items-center space-y-3">
          <CardTitle>Campo de Pesquisa</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2 bg-white shadow-2xl">
            <div className="flex flex-row items-center space-x-2">
              <Label>Codigo:</Label>
              <Input
                type="number"
                onChange={(e) => setProductId(Number(e.target.value) || null)}
                placeholder="Pesquisar por código..."
                className="bg-red-300/80"
              />
            </div>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2 bg-white shadow-2xl">
            <Label>Nome:</Label>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por nome..."
                className="pl-10 bg-red-300/80"
              />
            </div>
            {/* O botão de busca não é mais necessário, pois a busca é automática */}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col overflow-auto w-full grow p-2 bg-white rounded-2xl shadow-2xl space-y-1.5">
        <div className="flex flex-row items-center justify-center space-x-2">
          <Button
            size={"sm"}
            className="font-bold text-white/80 shadow-2xl"
            onClick={() => router.push("/stock-balance/balance")}
          >
            <ArrowLeftIcon /> Atualizados
          </Button>
          <h1 className="font-bold text-2xl text-center text-muted-foreground">
            Tabela de Produtos
          </h1>
        </div>
        <div className="flex flex-col overflow-auto p-1">
          {" "}
          {(isLoading || isLoadingById) && (
            <p className="text-center">Buscando produtos...</p>
          )}
          {!(isLoading || isLoadingById) && tableData.length === 0 && (
            <p className="text-center">Nenhum produto encontrado.</p>
          )}
          <ProductTable data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default StockBalancePage;
