import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade e Proteção de Dados (LGPD) da Carter, com transparência sobre coleta, uso e pagamentos via Shopay-Canvi."
};

const updatedAt = "dd/mm/aaaa";

const faqs = [
  {
    q: "Quais dados a Carter coleta?",
    a: "Coletamos dados informados pelo usuário quando necessário e dados técnicos de navegação para segurança e melhoria da experiência."
  },
  {
    q: "A Carter processa pagamento?",
    a: "Não. O checkout e o processamento de pagamento são feitos exclusivamente pela SHOPAY-CANVI."
  },
  {
    q: "Quem tem acesso aos dados do cartão?",
    a: "Somente a SHOPAY-CANVI e seus processadores certificados. A Carter não acessa nem armazena dados completos de cartão."
  },
  {
    q: "Posso desativar cookies?",
    a: "Sim. Você pode recusar cookies no banner e/ou ajustar as preferências do navegador."
  },
  {
    q: "Por quanto tempo os dados ficam armazenados?",
    a: "Mantemos os dados pelo tempo necessário para cumprir obrigações legais, atender solicitações e operar o serviço."
  },
  {
    q: "Como solicitar exclusão de dados?",
    a: "Entre em contato pelo e-mail de privacidade com seus dados e a solicitação específica."
  }
];

export default function PrivacidadePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Legal</p>
          <h1 className="text-4xl font-serif">Política de Privacidade e Proteção de Dados</h1>
          <p className="text-lg text-slate-300">
            Transparência total sobre como a Carter trata dados pessoais e como os pagamentos são processados pela
            SHOPAY-CANVI.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>LGPD</Badge>
          <Badge>Privacidade</Badge>
          <Badge>Transparência</Badge>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Última atualização: {updatedAt}</p>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-serif">1. Introdução e escopo</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p>
              Esta Política explica como a Carter coleta, usa, armazena, compartilha e protege dados pessoais quando
              você navega, se cadastra ou entra em contato com nossos canais.
            </p>
            <p>
              A Carter atua como vitrine e curadoria de produtos, além de oferecer suporte ao cliente. O checkout e o
              processamento de pagamentos são realizados exclusivamente pela SHOPAY-CANVI.
            </p>
            <p>
              Para entender o nosso modelo de operação, consulte a página de{" "}
              <Link href="/transparencia" className="underline">
                Transparência
              </Link>
              .
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-serif">2. Definições</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div>
              <h3 className="font-medium text-slate-100">Carter</h3>
              <p>Plataforma digital que atua como canal afiliado, vitrine e curadoria de produtos.</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-100">Usuário</h3>
              <p>Pessoa que navega, se cadastra, solicita suporte ou realiza compras por meio da plataforma.</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-100">Dados pessoais</h3>
              <p>Informações que identificam ou possam identificar o usuário, conforme a LGPD.</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-100">Tratamento</h3>
              <p>Toda operação realizada com dados pessoais, como coleta, uso, armazenamento e compartilhamento.</p>
            </div>
            <div>
              <h3 className="font-medium text-slate-100">Cookies</h3>
              <p>Pequenos arquivos usados para reconhecer preferências, medir desempenho e melhorar a navegação.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">3. Quais dados coletamos</h2>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-slate-100">3.1 Dados fornecidos pelo usuário</h3>
            <p>Coletamos apenas quando necessário para cadastro, contato ou suporte:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Nome e sobrenome</li>
              <li>E-mail</li>
              <li>Telefone</li>
              <li>Endereço</li>
              <li>Dados necessários para faturamento e entrega</li>
              <li>Informações relacionadas ao atendimento</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-slate-100">3.2 Dados coletados automaticamente</h3>
            <p>Durante a navegação, coletamos dados técnicos e comportamentais, como:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Endereço IP (anonimizado quando possível)</li>
              <li>Localização aproximada (cidade/estado/país)</li>
              <li>Dispositivo, sistema operacional e navegador</li>
              <li>Idioma e fuso horário</li>
              <li>Páginas visitadas, tempo de navegação e origem do acesso</li>
              <li>Cookies e identificadores anônimos</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-slate-100">3.3 Dados de pagamento</h3>
            <p>
              O checkout, antifraude e processamento financeiro são feitos pela SHOPAY-CANVI. A Carter não coleta nem
              armazena dados completos de cartão (PAN, CVV, senha).
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">4. Finalidades do tratamento</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Viabilizar cadastro, contato e suporte ao usuário</li>
          <li>Operar pedidos, acompanhar entregas e comunicações relacionadas</li>
          <li>Prevenir fraudes, abusos e incidentes de segurança</li>
          <li>Melhorar performance, conteúdo e experiência na plataforma</li>
          <li>Cumprir obrigações legais e regulatórias</li>
          <li>Gerar análises estatísticas e de desempenho</li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">5. Bases legais (LGPD)</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Consentimento, quando aplicável (ex.: cookies não essenciais)</li>
          <li>Execução de contrato e procedimentos preliminares (cadastro, suporte e pedidos)</li>
          <li>Legítimo interesse, com avaliação de impacto e respeito aos direitos do titular</li>
          <li>Cumprimento de obrigação legal ou regulatória</li>
        </ul>
        <p className="text-sm text-slate-300">
          Para informações complementares, consulte nossos{" "}
          <Link href="/termos" className="underline">
            Termos de Uso
          </Link>
          .
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">6. Compartilhamento de dados</h2>
        <p className="text-sm text-slate-300">Compartilhamos dados apenas quando necessário e com segurança, incluindo:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Fornecedores parceiros para entrega e pós-venda</li>
          <li>Serviços de tecnologia, hospedagem e analytics</li>
          <li>SHOPAY-CANVI para checkout, pagamentos, antifraude e confirmação de pedidos</li>
          <li>Autoridades competentes, quando exigido por lei</li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">7. Cookies e tecnologias</h2>
        <p className="text-sm text-slate-300">
          Utilizamos cookies e tecnologias semelhantes para manter sua sessão, salvar preferências e medir desempenho.
          Você pode gerenciar seu consentimento no banner de cookies ou nas configurações do navegador.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">8. Segurança da informação</h2>
        <p className="text-sm text-slate-300">
          Adotamos medidas técnicas e administrativas alinhadas a padrões de mercado, como controle de acesso,
          criptografia e monitoramento. Nenhum sistema é 100% inviolável, mas buscamos reduzir riscos continuamente.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">9. Retenção e descarte</h2>
        <p className="text-sm text-slate-300">
          Retemos dados apenas pelo tempo necessário para cumprir obrigações legais, atender solicitações, prevenir
          fraudes e operar o serviço. Após esse período, os dados são eliminados ou anonimizados.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">10. Direitos do titular</h2>
        <p className="text-sm text-slate-300">Você pode solicitar, a qualquer momento:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Acesso aos seus dados</li>
          <li>Correção de dados incompletos ou desatualizados</li>
          <li>Exclusão, quando aplicável</li>
          <li>Portabilidade</li>
          <li>Revogação do consentimento</li>
          <li>Oposição a tratamentos específicos</li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">11. Canal de contato / DPO</h2>
        <p className="text-sm text-slate-300">
          Para solicitações de privacidade, entre em contato com nosso encarregado (DPO) em{" "}
          <a href="mailto:privacidade@seudominio.com" className="underline">
            privacidade@seudominio.com
          </a>
          . Para suporte geral, escreva para{" "}
          <a href="mailto:suporte@seudominio.com" className="underline">
            suporte@seudominio.com
          </a>
          .
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">12. Alterações na política</h2>
        <p className="text-sm text-slate-300">
          Podemos atualizar esta Política periodicamente. Quando houver mudanças relevantes, informaremos por meio dos
          canais oficiais.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif">13. Foro e lei aplicável</h2>
        <p className="text-sm text-slate-300">
          Esta Política é regida pelas leis da República Federativa do Brasil. O foro competente será o do domicílio do
          titular, quando aplicável.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-serif">Perguntas frequentes</h2>
          <p className="text-sm text-slate-300">Respostas objetivas sobre privacidade e pagamentos.</p>
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
        <h2 className="text-2xl font-serif">Pronto para conhecer a curadoria Carter?</h2>
        <p className="text-sm text-slate-300">
          Explore nossos produtos e, se precisar, fale com o suporte para esclarecer qualquer dúvida.
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
