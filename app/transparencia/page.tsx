import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Entenda como a Carter opera, monetiza, entrega e protege seus dados em parceria com a Shopay-Canvi."
};

const faqs = [
  {
    q: "A Carter e marketplace?",
    a: "A Carter atua como plataforma afiliada e curadoria, conectando clientes a parceiros homologados."
  },
  {
    q: "Quem e responsavel pelo envio?",
    a: "O envio e feito pelo fornecedor parceiro, com acompanhamento do suporte Carter."
  },
  {
    q: "Como acompanho o pedido?",
    a: "O rastreio e informado quando disponivel no checkout ou via suporte."
  },
  {
    q: "Quais dados a Carter coleta?",
    a: "Apenas dados anonimizados e tecnicos, com opt-out disponivel no banner de cookies."
  },
  {
    q: "Posso desativar cookies?",
    a: "Sim. Voce pode recusar no banner e manter apenas coleta basica anonima."
  },
  {
    q: "Como falo com o suporte?",
    a: "Entre em contato pelo suporte Carter informando o numero do pedido."
  }
];

export default function TransparenciaPage() {
  const updatedAt = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Transparencia</p>
          <h1 className="text-4xl font-serif">Transparencia</h1>
          <p className="text-lg text-slate-300">
            Informacoes claras sobre como a Carter opera, vende e entrega.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>LGPD</Badge>
          <Badge>Seguranca</Badge>
          <Badge>Parcerias</Badge>
        </div>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Modelo de operacao</CardTitle>
            <CardDescription>
              A Carter atua como plataforma afiliada/white-label em parceria com a Shopay-Canvi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">
              Os produtos sao fornecidos por parceiros homologados. A Carter e o canal de venda, curadoria e suporte ao
              cliente, garantindo clareza e acompanhamento durante a jornada.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Como a Carter monetiza</CardTitle>
            <CardDescription>
              Recebemos comissao por venda e/ou parcerias comerciais, sem custo extra para o cliente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">
              Nossa remuneracao vem do parceiro, de forma transparente, para manter a plataforma e o suporte.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produtos e fornecedores</CardTitle>
            <CardDescription>
              Selecionamos parceiros por confiabilidade, historico de entrega e qualidade de atendimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">
              Estoque e envio sao responsabilidade do fornecedor parceiro. A Carter acompanha o fluxo e auxilia o
              cliente quando necessario.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos e seguranca</CardTitle>
            <CardDescription>
              Pagamentos processados por gateways seguros com boas praticas de criptografia.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">
              A Carter nao armazena dados sensiveis de cartao, mantendo o fluxo protegido.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Entregas e prazos</CardTitle>
            <CardDescription>
              Prazos sao exibidos no checkout e o rastreio e informado quando disponivel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">
              Em caso de atraso, o suporte Carter abre um chamado e acompanha a resolucao com o fornecedor parceiro.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trocas, devolucoes e suporte</CardTitle>
            <CardDescription>
              Fale com o suporte informando o numero do pedido para iniciar o atendimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <Link href="/politicas" className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]">
                Politicas e trocas
              </Link>
              <span className="text-xs text-slate-400">/</span>
              <Link href="/suporte" className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--accent)]">
                Falar com suporte
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Privacidade e dados (LGPD)</CardTitle>
            <CardDescription>
              Coletamos dados minimos anonimizados e oferecemos opt-out no banner de cookies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">
              Voce pode recusar cookies e manter apenas a coleta basica anonima. Para mais detalhes, consulte a politica
              de privacidade.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link href="/politicas">Politica de Privacidade</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumo rapido</CardTitle>
            <CardDescription>
              Carter e curadoria + canal de venda + suporte. Parceiros cuidam do estoque e envio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Comissao por venda, sem custo oculto.</li>
              <li>Checkout seguro, sem armazenamento de dados sensiveis.</li>
              <li>Suporte ativo em caso de atraso ou duvida.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif">Perguntas frequentes</h2>
          <p className="text-sm text-slate-300">Transparencia em respostas diretas.</p>
        </div>
        <Accordion>
          {faqs.map((item) => (
            <AccordionItem key={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Separator />

      <section className="space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-8 text-center">
        <h2 className="text-2xl font-serif">Transparencia em cada etapa da compra</h2>
        <p className="text-sm text-slate-300">
          Conheca os produtos da Carter ou fale com nosso suporte para qualquer duvida.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/catalogo">Ir para produtos</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="mailto:suporte@carter.example">Falar com suporte</a>
          </Button>
        </div>
      </section>

      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Ultima atualizacao: {updatedAt}
      </div>
    </div>
  );
}
