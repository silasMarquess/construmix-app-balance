This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sobre o Projeto
A Solução Full-Stack para a Loja do Meu Amigo 

Na terça-feira, 29/09/2025, recebi uma ligação urgente do meu amigo, dono de uma casa de material de construção em Senador La Rocque. Ele precisava de um balanço de estoque rápido para negociar a venda da loja até a sexta-feira. O sistema dele era bom, mas não servia para a escala do problema.
Eu tinha que agir rápido.

1. O Problema Real de Negócio (A Dor)
O processo de balanço de estoque da loja estava em risco por vários gargalos:

Inconsistência de Dados: O sistema ERP retornava uma lista imensa do banco de dados, incluindo itens que não estavam mais em estoque, forçando a equipe a perder tempo com dados desnecessários.

Monousuário e Centralizado: Apenas um terminal podia ser usado. O funcionário precisava fazer viagens constantes entre o computador e as prateleiras, gerando lentidão e brechas para erros humanos.

Prazo Apertado: A solução precisava estar funcionando em menos de 48 horas.

2. A Solução Full-Stack em 3 Horas (O Resgate)

A resposta foi desenvolver um Aplicativo Web dedicado e otimizado, acessível via browser de qualquer dispositivo na rede interna da loja.

O objetivo: Criar uma interface simples e multiusuário que se conectasse ao BD existente e permitisse que todos os funcionários atualizassem o estoque simultaneamente, focando apenas nos itens que interessavam para o balanço.

3. O Stack e as Decisões Técnicas
Para entregar a solução com a velocidade e segurança necessárias, utilizei este stack focado:

- Frontend & Backend: Escolhi Next.js para ter a agilidade de um framework Full-Stack unificado (Frontend + API Routes).

- Conexão Segura: Usei Drizzle-ORM para fazer o mapeamento Objeto-Relacional e interagir de forma segura e produtiva com o Postgres legado do cliente.
Performance Multiplataforma: Implementei React-Query no frontend. Isso garantiu cache do lado do cliente, eliminando delay e garantindo que as atualizações de estoque feitas por um funcionário fossem refletidas instantaneamente para os outros.

User Experience (UX): Usei a biblioteca de componentes ShadcnUI para criar uma interface visualmente limpa e amigável.

"Rapa o APP ficou um bala"

4. O Resultado e o Impacto no Negócio
A aplicação foi entregue em 3 horas, e o impacto foi imediato:

Paralelização: O processo que levaria dias no sistema antigo foi acelerado, pois vários funcionários puderam trabalhar simultaneamente em seus próprios dispositivos.

Foco e Precisão: A interface focou apenas nos dados relevantes, permitindo que a equipe conseguisse o valor exato do estoque a preço de custo.

Meta Alcançada: O balanço foi concluído a tempo de meu amigo negociar a venda da loja.

Hoje sábado ele me liga bem cedo: "Voçê foi uma peça chave nesse desafio, eu não sabia o que fazer e voçê me ajudou"...Eu fiquei grato por minha solução ter ajudado. Para mim valeu a pena essa experiência trouxe ainda mais responsabilidade. A equipe dele também ajudou muito no processo...
