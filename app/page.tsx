import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-linear-to-r/srgb from-indigo-500 to-teal-400">
      <Card className="flex flex-col w-3/4 py-6 items-center justify-center">
        <CardContent className="text-center space-y-3">
          <CardTitle>Balanço de Estoque</CardTitle>
          <CardDescription>
            Apicativo auxiliar de Balanço de Estoque da loja Construmix
          </CardDescription>
          <Link href="/stock-balance">
            <Button>
              Começar <ArrowRight />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
