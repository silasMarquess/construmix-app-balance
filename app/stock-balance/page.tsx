"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, FilterIcon, Search } from "lucide-react";
import ProductTable from "./components/table-produts";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StockBalancePage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full h-full items-center p-2.5  space-y-3 ">
      <Card className="flex flex-col w-full h-1/7 max-w-sm items-center justify-center shadow-2xl ">
        <CardContent className="flex flex-col items-center space-y-3">
          <CardTitle>Campo de Pesquisa</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2 bg-white shadow-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar produto..."
                className="pl-10 bg-red-300/80"
              />
            </div>
            <Button>
              Buscar <FilterIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col overflow-auto w-full grow p-2 bg-white rounded-2xl shadow-2xl">
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
        <ProductTable />
      </div>
    </div>
  );
};

export default StockBalancePage;
