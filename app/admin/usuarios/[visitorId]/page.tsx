import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ visitorId: string }>;
};

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hrs > 0) return `${hrs}h ${remMins}m`;
  if (mins > 0) return `${mins}m`;
  return `${seconds}s`;
}

export default async function Page({ params }: PageProps) {
  const { visitorId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
  const visitor = await prisma.visitor.findUnique({
    where: { visitorId }
  });

  if (!visitor) {
    notFound();
  }

  const [sessions, events] = await Promise.all([
    prisma.session.findMany({
      where: { visitorId },
      orderBy: { startedAt: "desc" }
    }),
    prisma.event.findMany({
      where: { visitorId },
      orderBy: { createdAt: "desc" },
      take: 300
    })
  ]);

  return (
    <div className="space-y-8">
      <AdminShell
        userName={session?.user?.name}
        title="Informações de Usuários"
        description="Detalhes do visitante anonimo."
        active="usuarios"
      />

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Resumo do visitante</div>
        <h2 className="mt-2 text-xl font-serif">{visitor.visitorId}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Novo/Retornou</div>
            <div className="text-sm">{visitor.isReturning ? "Retornou" : "Novo"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Cidade/Estado/País</div>
            <div className="text-sm">{[visitor.city, visitor.region, visitor.country].filter(Boolean).join(" / ") || "—"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Dispositivo</div>
            <div className="text-sm">{visitor.deviceType || "—"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Sistema operacional</div>
            <div className="text-sm">{visitor.os || "—"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Navegador</div>
            <div className="text-sm">{visitor.browser || "—"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Idioma</div>
            <div className="text-sm">{visitor.language || "—"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Fuso horário</div>
            <div className="text-sm">{visitor.timeZone || "—"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Primeira visita</div>
            <div className="text-sm">{visitor.firstVisit.toLocaleString("pt-BR")}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Última visita</div>
            <div className="text-sm">{visitor.lastVisit.toLocaleString("pt-BR")}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Total de páginas</div>
            <div className="text-sm">{visitor.totalPageViews}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Tempo total</div>
            <div className="text-sm">{formatDuration(visitor.totalTimeSeconds)}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Origem</div>
            <div className="text-sm">{visitor.utmSource || visitor.referrer || "—"}</div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Sessões</div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[800px] w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-3 py-2">Início</th>
                <th className="px-3 py-2">Fim</th>
                <th className="px-3 py-2">Duração</th>
                <th className="px-3 py-2">Páginas</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-3 text-slate-400">Sem sessões registradas.</td>
                </tr>
              ) : (
                sessions.map((s) => (
                  <tr key={s.sessionKey} className="border-t border-[var(--border-subtle)]">
                    <td className="px-3 py-2">{s.startedAt.toLocaleString("pt-BR")}</td>
                    <td className="px-3 py-2">{s.endedAt ? s.endedAt.toLocaleString("pt-BR") : "—"}</td>
                    <td className="px-3 py-2">{formatDuration(s.durationSeconds)}</td>
                    <td className="px-3 py-2">{s.pageViews}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Timeline de eventos</div>
        <div className="mt-4 space-y-3">
          {events.length === 0 ? (
            <div className="text-sm text-slate-400">Sem eventos registrados.</div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-medium">{event.type}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {event.createdAt.toLocaleString("pt-BR")}
                  </div>
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">URL</div>
                <div className="text-sm">{event.url}</div>
                {event.data ? (
                  <div className="mt-2 text-xs text-slate-400">
                    {JSON.stringify(event.data)}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
