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

const StockBalancePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Efeito para criar o "debounce"
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
    // A queryKey agora inclui o termo de busca para cache correto
    queryKey: ["products", debouncedSearchTerm],
    queryFn: () => getProductBy({ nome: debouncedSearchTerm }),
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

  return (
    <div className="flex flex-col w-full h-full items-center p-2 bg-white/65  space-y-2 ">
      <Card className="flex flex-col w-full h-1/7 max-w-sm items-center justify-center shadow-2xl ">
        <CardContent className="flex flex-col items-center space-y-3">
          <CardTitle>Campo de Pesquisa</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2 bg-white shadow-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar produto..."
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
            onClick={() => router.back()}
          >
            <ArrowLeftIcon /> Voltar
          </Button>
          <h1 className="font-bold text-2xl text-center text-muted-foreground">
            Tabela de Produtos
          </h1>
        </div>
        <div className="flex flex-col overflow-auto p-1">
          {" "}
          {isLoading && <p className="text-center">Buscando produtos...</p>}
          <ProductTable data={products || []} />
        </div>
      </div>
    </div>
  );
};

export default StockBalancePage;
