import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas | Carter",
  description: "Políticas de trocas, privacidade e termos de uso da Carter."
};

export default function Politicas() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Políticas</p>
        <h1 className="text-3xl font-serif">Trocas, privacidade e termos</h1>
        <p className="text-sm text-slate-300">
          Conteúdo informativo com linguagem clara e objetiva.
        </p>
      </header>

      {/* TROCAS E DEVOLUÇÕES */}
      <section className="space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-serif">Trocas e devoluções</h2>
          <p className="text-sm text-slate-300">
            A Carter atua como vitrine e canal afiliado. A entrega e o envio são realizados por parceiros fornecedores.
            Para trocas, devoluções e cancelamentos, seguimos o Código de Defesa do Consumidor e orientamos o processo
            via suporte.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Direito de arrependimento (compras online)</p>
          <p>
            Você pode solicitar devolução em até <span className="font-medium text-slate-100">7 (sete) dias corridos</span>{" "}
            após o recebimento do pedido, conforme o CDC, desde que o produto esteja{" "}
            <span className="font-medium text-slate-100">sem uso</span>, com{" "}
            <span className="font-medium text-slate-100">embalagem original</span> e{" "}
            <span className="font-medium text-slate-100">itens completos</span>.
          </p>

          <p className="font-medium text-slate-100">Como solicitar</p>
          <ul className="list-disc pl-5">
            <li>Entre em contato com o suporte informando o número do pedido.</li>
            <li>Descreva o motivo (arrependimento, defeito, divergência, etc.).</li>
            <li>A equipe orientará os próximos passos (coleta, postagem e análise, quando aplicável).</li>
          </ul>

          <p className="text-xs text-slate-400">
            Observação: prazos e regras específicas podem variar conforme o fornecedor parceiro e a natureza do produto.
            A Carter acompanha o atendimento e busca a melhor resolução junto ao parceiro.
          </p>
        </div>
      </section>

      {/* PRIVACIDADE */}
      <section className="space-y-5 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-serif">🔐 Política de Privacidade e Proteção de Dados – Carter</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Última atualização: 14 / 01 / 2026
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <p>
            A Carter valoriza a sua privacidade e a proteção dos seus dados pessoais. Esta Política descreve como
            coletamos, usamos, armazenamos, compartilhamos e protegemos as informações dos usuários que acessam nossa
            plataforma.
          </p>
          <p>
            Ao utilizar nossos serviços, você declara estar ciente e de acordo com os termos desta Política.
          </p>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
            <p className="text-sm text-slate-200">
              <span className="font-medium text-slate-100">Importante:</span> a Carter{" "}
              <span className="font-medium text-slate-100">não processa pagamentos</span>. O checkout e o processamento
              do pagamento ocorrem exclusivamente na{" "}
              <span className="font-medium text-slate-100">Shopay-Canvi</span>. A Carter não tem acesso a dados completos
              de cartão (número, CVV ou senha).
            </p>
          </div>
        </div>

        <ol className="space-y-4 text-sm text-slate-300">
          <li>
            <p className="font-medium text-slate-100">1. Quem somos</p>
            <div className="space-y-2">
              <p>
                A Carter é uma plataforma digital que atua como canal afiliado e intermediador de vendas, operando em
                parceria com fornecedores e plataformas de distribuição exclusivos da Shopay-Canvi.
              </p>
              <p>
                A Carter não fabrica produtos e não mantém estoque próprio. Atuamos como vitrine, curadoria e suporte
                ao cliente, acompanhando o pedido junto aos parceiros.
              </p>
            </div>
          </li>

          <li>
            <p className="font-medium text-slate-100">2. Quais dados coletamos</p>
            <p>Podemos coletar os seguintes tipos de informações:</p>

            <div className="mt-2 space-y-3">
              <div className="space-y-2">
                <p className="font-medium text-slate-100">2.1 Dados fornecidos pelo usuário</p>
                <p>Ao se cadastrar, entrar em contato ou solicitar suporte, podemos coletar:</p>
                <ul className="list-disc pl-5">
                  <li>Nome e sobrenome</li>
                  <li>E-mail</li>
                  <li>Telefone</li>
                  <li>Endereço (quando necessário para entrega)</li>
                  <li>Informações de atendimento e suporte</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-slate-100">2.2 Dados coletados automaticamente</p>
                <p>Ao navegar em nosso site, podemos coletar dados técnicos e comportamentais, como:</p>
                <ul className="list-disc pl-5">
                  <li>Endereço IP (quando possível, de forma anonimizada/mascarada)</li>
                  <li>Cidade, estado e país (aproximados)</li>
                  <li>Tipo de dispositivo</li>
                  <li>Sistema operacional</li>
                  <li>Navegador</li>
                  <li>Idioma</li>
                  <li>Fuso horário</li>
                  <li>Páginas acessadas e origem do acesso (referrer/UTM)</li>
                  <li>Tempo de navegação e interações (ex.: cliques/scroll)</li>
                  <li>Cookies e identificadores anônimos</li>
                </ul>
                <p>
                  Esses dados são usados para segurança, prevenção a fraudes, análise de performance e melhoria da
                  experiência.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-slate-100">2.3 Dados de pagamento</p>
                <p>
                  O processamento do pagamento ocorre exclusivamente na{" "}
                  <span className="font-medium text-slate-100">Shopay-Canvi</span>, que pode coletar e tratar dados
                  financeiros para checkout, antifraude e confirmação do pedido, conforme as políticas dela.
                </p>
                <p>
                  A Carter <span className="font-medium text-slate-100">não solicita ou armazena</span> dados completos de cartão de
                  crédito (número, CVV ou senha).
                </p>
              </div>
            </div>
          </li>

          <li>
            <p className="font-medium text-slate-100">3. Finalidades do uso dos dados</p>
            <p>Seus dados podem ser usados para:</p>
            <ul className="list-disc pl-5">
              <li>Viabilizar navegação, segurança e melhoria da plataforma</li>
              <li>Atendimento ao cliente e suporte pós-venda</li>
              <li>Comunicações relacionadas ao serviço</li>
              <li>Prevenção a fraudes e segurança</li>
              <li>Cumprimento de obrigações legais</li>
              <li>Análises estatísticas e de desempenho</li>
            </ul>
            <p>Nunca vendemos seus dados.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">4. Compartilhamento de dados</p>
            <p>Podemos compartilhar dados de forma limitada e necessária com:</p>
            <ul className="list-disc pl-5">
              <li>Fornecedores parceiros (para envio e suporte do pedido)</li>
              <li>Serviços de tecnologia, hospedagem e analytics</li>
              <li>
                <span className="font-medium text-slate-100">Shopay-Canvi</span> (checkout, pagamento, antifraude e
                confirmação do pedido)
              </li>
              <li>Autoridades públicas, quando exigido por lei</li>
            </ul>
          </li>

          <li>
            <p className="font-medium text-slate-100">5. Cookies e tecnologias</p>
            <p>Utilizamos cookies para:</p>
            <ul className="list-disc pl-5">
              <li>Manter sessão e preferências</li>
              <li>Medir desempenho e estabilidade</li>
              <li>Entender navegação (analytics)</li>
            </ul>
            <p>Você pode gerenciar cookies nas configurações do navegador.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">6. Segurança da informação</p>
            <p>Adotamos medidas técnicas e administrativas para proteger seus dados, como:</p>
            <ul className="list-disc pl-5">
              <li>Criptografia e proteção de tráfego</li>
              <li>Controle de acesso</li>
              <li>Monitoramento e boas práticas de segurança</li>
            </ul>
            <p>Nenhum sistema é 100% inviolável, mas seguimos padrões de mercado.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">7. Seus direitos (LGPD)</p>
            <p>Você pode solicitar:</p>
            <ul className="list-disc pl-5">
              <li>Acesso e confirmação de tratamento</li>
              <li>Correção de dados</li>
              <li>Exclusão e anonimização (quando aplicável)</li>
              <li>Portabilidade (quando aplicável)</li>
              <li>Revogação de consentimento</li>
            </ul>
            <p>Para exercer seus direitos, contate nossos canais oficiais.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">8. Retenção</p>
            <p>Armazenamos dados apenas pelo tempo necessário para:</p>
            <ul className="list-disc pl-5">
              <li>Operar o serviço</li>
              <li>Garantir suporte</li>
              <li>Cumprir obrigações legais</li>
              <li>Prevenir fraudes e proteger direitos</li>
            </ul>
            <p>Após esse período, os dados podem ser excluídos ou anonimizados.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">9. Menores de idade</p>
            <p>O uso é destinado a maiores de 18 anos, salvo autorização legal.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">10. Alterações</p>
            <p>Podemos atualizar esta Política. Mudanças relevantes podem ser comunicadas por avisos na plataforma.</p>
          </li>

          <li>
            <p className="font-medium text-slate-100">11. Contato</p>
            <p>
              Para solicitações relacionadas à privacidade:{" "}
              <span className="font-medium text-slate-100">privacidade@carter.com</span>
              <br />
              Suporte: <span className="font-medium text-slate-100">suporte@carter.com</span>
            </p>
          </li>
        </ol>
      </section>

      {/* TERMOS DE USO */}
      <section className="space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <div className="space-y-2">
          <h2 className="text-xl font-serif">Termos de uso</h2>
          <p className="text-sm text-slate-300">
            Ao acessar e utilizar a plataforma Carter, você concorda com estes Termos. Caso não concorde, não utilize o
            site.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Resumo transparente</p>
          <ul className="list-disc pl-5">
            <li>A Carter atua como vitrine/curadoria e canal afiliado.</li>
            <li>O pagamento é finalizado exclusivamente na <span className="font-medium text-slate-100">Shopay-Canvi</span>.</li>
            <li>A Carter não solicita ou armazena dados completos de cartão.</li>
            <li>Envio e logística são responsabilidade do fornecedor parceiro.</li>
            <li>A Carter presta suporte e acompanha o pedido.</li>
          </ul>

          <p className="font-medium text-slate-100">Pagamento</p>
          <p>
            O checkout e o processamento do pagamento são realizados exclusivamente pela{" "}
            <span className="font-medium text-slate-100">Shopay-Canvi</span>, que pode aplicar suas próprias políticas e
            mecanismos de segurança/antifraude.
          </p>

          <p className="font-medium text-slate-100">Responsabilidades</p>
          <p>
            A Carter se compromete a oferecer a melhor experiência possível na plataforma, mas não se responsabiliza por
            falhas de terceiros (fornecedores, transportadoras, processadores de pagamento, indisponibilidade de rede).
          </p>

          {/* <p className="text-xs text-slate-400">
            Recomendado: criar uma página separada para Termos completos (/termos) e Privacidade (/privacidade) quando você
            quiser deixar ainda mais profissional e detalhado.
          </p> */}
        </div>
      </section>
    </div>
  );
}
