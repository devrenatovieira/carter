import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, ShieldCheck, Truck, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre a Carter",
  description:
    "Conheça a Carter, plataforma afiliada da Shopay-Canvi que conecta voce a produtos selecionados com transparencia e compra segura."
};

const steps = [
  {
    title: "Curadoria de produtos",
    description: "Selecionamos itens com qualidade, reputacao e boa experiencia de compra.",
    icon: CheckCircle2
  },
  {
    title: "Compra e pagamento seguro",
    description: "Checkout protegido com parceiros homologados e fluxo simples.",
    icon: ShieldCheck
  },
  {
    title: "Envio por fornecedor parceiro",
    description: "Logistica feita por quem fornece o produto, com prazos informados.",
    icon: Truck
  },
  {
    title: "Suporte Carter ate a entrega",
    description: "Acompanhamos o pedido e ajudamos no que voce precisar.",
    icon: HeartHandshake
  }
];

const values = [
  "Transparencia",
  "Confianca",
  "Curadoria de qualidade",
  "Respeito ao cliente",
  "Tecnologia a servico da experiencia",
  "Parcerias de longo prazo"
];

const deliveries = [
  { title: "Curadoria", description: "Produtos selecionados com criterio e consistencia." },
  { title: "Seguranca", description: "Checkout com parceiros confiaveis e fluxo transparente." },
  { title: "Atendimento", description: "Suporte para ajudar antes, durante e depois da compra." },
  { title: "Praticidade", description: "Compra rapida e objetiva em um unico lugar." },
  { title: "Variedade", description: "Selecao ampla de categorias e estilos." },
  { title: "Experiencia", description: "Interface clara, elegante e focada no cliente." }
];

const faqs = [
  {
    q: "A Carter fabrica os produtos?",
    a: "Nao. A Carter atua como vitrine e curadoria, conectando voce a produtos de parceiros homologados."
  },
  {
    q: "Quem envia os pedidos?",
    a: "O envio e responsabilidade do fornecedor parceiro, com acompanhamento do suporte Carter."
  },
  {
    q: "Como funciona o suporte?",
    a: "Voce pode falar com nosso suporte a qualquer momento e acompanhamos o fluxo com o parceiro."
  },
  {
    q: "Como acompanho meu pedido?",
    a: "Quando disponivel, o rastreio e informado no fluxo do parceiro ou via suporte."
  },
  {
    q: "Como a Carter seleciona parceiros?",
    a: "Avaliamos confiabilidade, entrega, reputacao e padroes de atendimento."
  }
];

export default function SobrePage() {
  const updatedAt = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Institucional</p>
          <h1 className="text-4xl font-serif">Sobre a Carter</h1>
          <p className="text-lg text-slate-300">
            Uma plataforma afiliada e parceira da Shopay-Canvi, conectando voce a produtos selecionados.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Afiliada</Badge>
          <Badge>Curadoria</Badge>
          <Badge>Compra Segura</Badge>
        </div>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif">Quem somos</h2>
          <p className="text-sm text-slate-300">
            A Carter e uma plataforma digital de vendas criada para conectar clientes a produtos de alta qualidade por
            meio de uma rede de lojas e fornecedores parceiros. Nascemos como um canal afiliado oficial da Shopay-Canvi
            e atuamos como distribuidor digital com foco em experiencia, pagamento seguro e suporte.
          </p>
          <p className="text-sm text-slate-300">
            Nao fabricamos produtos: somos vitrine, curadoria e canal de venda. Nosso papel e garantir transparencia e
            facilitar o caminho entre voce e fornecedores confiaveis.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Compromisso com clareza</CardTitle>
            <CardDescription>
              Somos afiliados e parceiros. Explicamos o fluxo de compra, entrega e suporte de ponta a ponta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Parceiros</div>
            <div className="mt-2 text-sm text-slate-300">
              Trabalhamos com fornecedores homologados, garantindo padroes de qualidade e atendimento.
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif">Como funciona</h2>
          <p className="text-sm text-slate-300">Transparencia em quatro passos simples.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[var(--border-subtle)] p-2">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <CardTitle>{step.title}</CardTitle>
                  </div>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Missao</CardTitle>
            <CardDescription>
              Oferecer acesso a produtos selecionados, com transparencia, seguranca e uma experiencia simples.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Visao</CardTitle>
            <CardDescription>Ser referencia entre plataformas afiliadas de curadoria no Brasil.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-300">
              {values.map((value) => (
                <li key={value} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif">O que a Carter entrega</h2>
          <p className="text-sm text-slate-300">Uma experiencia premium do inicio ao fim.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deliveries.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif">Perguntas frequentes</h2>
          <p className="text-sm text-slate-300">Respostas claras e diretas sobre nosso modelo.</p>
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
        <h2 className="text-2xl font-serif">Pronto para descobrir produtos selecionados?</h2>
        <p className="text-sm text-slate-300">
          Explore a curadoria Carter e encontre produtos alinhados ao seu estilo.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/catalogo">Ver produtos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/transparencia">Transparencia</Link>
          </Button>
        </div>
      </section>

      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Ultima atualizacao: {updatedAt}
      </div>
    </div>
  );
}
