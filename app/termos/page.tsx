import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso da Carter com transparência sobre o modelo afiliado e pagamentos processados pela Shopay-Canvi."
};

const updatedAt = "dd/mm/aaaa";
const faqs = [
  {
    q: "A Carter processa pagamentos?",
    a: "Não. O checkout e o processamento são realizados exclusivamente pela SHOPAY-CANVI."
  },
  {
    q: "Quem é responsável pela entrega?",
    a: "Os fornecedores parceiros são responsáveis pelo envio; a Carter acompanha o pedido via suporte."
  },
  {
    q: "Como iniciar uma troca ou devolução?",
    a: "Entre em contato com o suporte informando o número do pedido para abrir a solicitação."
  }
];

export default function TermosPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Legal</p>
          <h1 className="text-4xl font-serif">Termos de Uso</h1>
          <p className="text-lg text-slate-300">
            Estes termos regem o uso da plataforma Carter. O checkout e o processamento de pagamentos são realizados
            exclusivamente pela SHOPAY-CANVI.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Transparência</Badge>
          <Badge>Compras seguras</Badge>
          <Badge>LGPD</Badge>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Última atualização: {updatedAt}</p>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-serif">Resumo Transparente</h2>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <ul className="list-disc space-y-1 pl-5">
              <li>Pagamento é processado exclusivamente pela SHOPAY-CANVI.</li>
              <li>A Carter não coleta nem armazena dados completos de cartão.</li>
              <li>Envio e estoque são responsabilidade de fornecedores parceiros.</li>
              <li>A Carter presta suporte e acompanha o pedido.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-serif">Aceitação dos termos</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p>
              Ao acessar ou utilizar a plataforma Carter, você declara ter lido, compreendido e aceito estes Termos de
              Uso e a{" "}
              <Link href="/privacidade" className="underline">
                Política de Privacidade
              </Link>
              .
            </p>
            <p>Se você não concorda com alguma condição, recomendamos não utilizar os serviços.</p>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">2. Quem é a Carter e modelo de operação</h2>
        <p className="text-sm text-slate-300">
          A Carter é uma plataforma digital que atua como canal afiliado/white-label, vitrine e curadoria de produtos.
          Operamos em parceria com fornecedores e com a SHOPAY-CANVI para a etapa de checkout e processamento de
          pagamentos.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">3. Elegibilidade e responsabilidades do usuário</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Ter capacidade civil para contratar e realizar compras.</li>
          <li>Fornecer informações verdadeiras e atualizadas.</li>
          <li>Utilizar a plataforma de forma ética e dentro da lei.</li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">4. Cadastro e segurança da conta</h2>
        <p className="text-sm text-slate-300">
          Você é responsável por manter a confidencialidade de suas credenciais e por toda atividade realizada em sua
          conta. Em caso de uso indevido, comunique imediatamente o suporte.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">5. Regras de compra e fluxo</h2>
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            A Carter oferece vitrine e curadoria, além de suporte ao cliente. O fornecedor parceiro é responsável por
            estoque, qualidade do produto e envio.
          </p>
          <p>
            O pagamento é processado exclusivamente pela SHOPAY-CANVI. A Carter não coleta nem armazena dados completos
            de cartão (PAN, CVV, senha).
          </p>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">6. Preços, disponibilidade e descrições</h2>
        <p className="text-sm text-slate-300">
          Os preços, ofertas e disponibilidade podem ser alterados a qualquer momento. Buscamos manter descrições
          precisas, mas variações podem ocorrer.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">7. Entrega e prazos</h2>
        <p className="text-sm text-slate-300">
          A logística é responsabilidade do fornecedor parceiro, com prazos informados no checkout. A Carter acompanha
          o status e auxilia o cliente em caso de necessidade.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">8. Trocas, devoluções e cancelamentos</h2>
        <p className="text-sm text-slate-300">
          As políticas de troca e devolução seguem o fornecedor parceiro e a legislação aplicável. Caso precise iniciar
          uma solicitação, entre em contato com o suporte informando o número do pedido.
        </p>
        <p className="text-sm text-slate-300">
          Para mais informações, consulte a página de{" "}
          <Link href="/transparencia" className="underline">
            Transparência
          </Link>
          .
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">9. Propriedade intelectual</h2>
        <p className="text-sm text-slate-300">
          Todo o conteúdo da plataforma, incluindo marca, layout, textos, imagens e código, é protegido por direitos de
          propriedade intelectual. É vedado o uso não autorizado.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">10. Condutas proibidas</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Fraude, abuso de promoções ou uso indevido de dados.</li>
          <li>Tentativas de engenharia reversa, exploração de falhas ou ataques.</li>
          <li>Publicação de conteúdo ilegal, ofensivo ou que viole direitos de terceiros.</li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">11. Limitação de responsabilidade</h2>
        <p className="text-sm text-slate-300">
          A Carter não se responsabiliza por falhas atribuíveis a fornecedores parceiros, logística de entrega ou
          serviços de pagamento da SHOPAY-CANVI. Eventuais indisponibilidades podem ocorrer por manutenção ou fatores de
          terceiros.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">12. Suspensão ou encerramento</h2>
        <p className="text-sm text-slate-300">
          Podemos suspender ou encerrar o acesso em caso de violação destes termos, fraude ou uso indevido da plataforma,
          preservando direitos legais.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">13. Alterações dos termos</h2>
        <p className="text-sm text-slate-300">
          Poderemos atualizar estes Termos periodicamente. Quando houver mudanças relevantes, comunicaremos pelos canais
          oficiais.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">14. Lei aplicável e foro</h2>
        <p className="text-sm text-slate-300">
          Estes Termos são regidos pelas leis da República Federativa do Brasil. O foro competente será o da comarca do
          domicílio do consumidor, quando aplicável.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">15. Contato</h2>
        <p className="text-sm text-slate-300">
          Para dúvidas e solicitações, escreva para{" "}
          <a href="mailto:suporte@seudominio.com" className="underline">
            suporte@seudominio.com
          </a>{" "}
          ou{" "}
          <a href="mailto:privacidade@seudominio.com" className="underline">
            privacidade@seudominio.com
          </a>
          .
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif">Dúvidas rápidas</h2>
          <p className="text-sm text-slate-300">Respostas objetivas sobre o uso da plataforma.</p>
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
        <h2 className="text-2xl font-serif">Pronto para voltar às compras?</h2>
        <p className="text-sm text-slate-300">
          Conheça a curadoria da Carter ou fale com nosso suporte para qualquer dúvida.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/catalogo">Voltar para a Loja</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="mailto:suporte@seudominio.com">Falar com suporte</a>
          </Button>
        </div>
      </section>

      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Última atualização: {updatedAt}</div>
    </div>
  );
}
