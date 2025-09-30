import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const productUpdate = z.object({
  estoque_atual: z
    .number({ message: "Estoque invalido" })
    .min(1, "valor nao pode ser menor que 1")
    .refine((e) => {
      if (e <= 0) return false;
      return true;
    }, "valor nao pode ser menor que 1"),
});

const StockProductDetail = () => {
  const form = useForm<z.infer<typeof productUpdate>>({
    resolver: zodResolver(productUpdate),
    defaultValues: {
      estoque_atual: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof productUpdate>) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-full w-full p-2 space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:w-auto w-full border shadow"
        >
          <FormItem>
            <FormLabel>Descrição do Produto</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" disabled={true} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="estoque_atual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque Atual</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Atualizar</Button>
        </form>
      </Form>
    </div>
  );
};

export default StockProductDetail;
