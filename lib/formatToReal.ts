/**
 * Formata um valor numérico para o padrão de moeda brasileira (BRL).
 * @param value O valor a ser formatado. Pode ser um número ou uma string.
 * @returns Uma string formatada como moeda (ex: "R$ 1.234,56").
 * Retorna "R$ 0,00" se o valor de entrada não for um número válido.
 */
export const formatCurrency = (value: number | string): string => {
  // Garante que o valor seja um número, convertendo se for uma string.
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Verifica se a conversão resultou em um número válido.
  if (isNaN(numericValue)) {
    // Retorna um valor padrão para entradas inválidas.
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(0);
  }

  // Usa a API Intl.NumberFormat para formatação de moeda.
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};
