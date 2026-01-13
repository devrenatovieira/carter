import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hrs > 0) return `${hrs}h ${remMins}m`;
  if (mins > 0) return `${mins}m`;
  return `${seconds}s`;
}

function asDateInput(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function parseDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default async function AdminVisitorsPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerSession(authOptions);

  const from = typeof searchParams.from === "string" ? searchParams.from : "";
  const to = typeof searchParams.to === "string" ? searchParams.to : "";
  const origin = typeof searchParams.origin === "string" ? searchParams.origin : "";
  const country = typeof searchParams.country === "string" ? searchParams.country : "";
  const device = typeof searchParams.device === "string" ? searchParams.device : "";
  const returning = typeof searchParams.returning === "string" ? searchParams.returning : "";
  const queryString = new URLSearchParams(
    Object.entries({ from, to, origin, country, device, returning }).filter(([, value]) => value)
  ).toString();

  const where: Record<string, unknown> = {};

  const fromDate = parseDate(from);
  const toDate = parseDate(to);

  if (fromDate || toDate) {
    where.lastVisit = {
      ...(fromDate ? { gte: fromDate } : {}),
      ...(toDate ? { lte: toDate } : {})
    };
  }

  if (origin) {
    where.OR = [
      { referrer: { contains: origin, mode: "insensitive" } },
      { utmSource: { contains: origin, mode: "insensitive" } }
    ];
  }

  if (country) {
    where.country = { equals: country, mode: "insensitive" };
  }

  if (device) {
    where.deviceType = device;
  }

  if (returning === "new") {
    where.isReturning = false;
  } else if (returning === "returning") {
    where.isReturning = true;
  }

  const visitors = await prisma.visitor.findMany({
    where,
    orderBy: { lastVisit: "desc" },
    take: 200
  });

  return (
    <div className="space-y-8">
      <AdminShell
        userName={session?.user?.name}
        title="Informações de Usuários"
        description="Dados anonimizados de visitantes e comportamento no site."
        active="usuarios"
      />

      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
        <form className="grid grid-cols-1 gap-4 md:grid-cols-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">De</label>
            <input name="from" type="date" defaultValue={asDateInput(from)} className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Até</label>
            <input name="to" type="date" defaultValue={asDateInput(to)} className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Origem</label>
            <input name="origin" defaultValue={origin} placeholder="referrer ou utm" className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">País</label>
            <input name="country" defaultValue={country} placeholder="BR" className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Dispositivo</label>
            <select name="device" defaultValue={device} className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-sm">
              <option value="">Todos</option>
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Novo/Retornou</label>
            <select name="returning" defaultValue={returning} className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-sm">
              <option value="">Todos</option>
              <option value="new">Novo</option>
              <option value="returning">Retornou</option>
            </select>
          </div>
          <div className="flex items-end gap-3 md:col-span-6">
            <button type="submit" className="rounded-full bg-brand-500 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white">
              Filtrar
            </button>
            <Link
              href={`/admin/usuarios${queryString ? `?${queryString}` : ""}`}
              className="rounded-full border border-[var(--border-subtle)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-[var(--accent)]"
            >
              Recarregar
            </Link>
            <Link href="/admin/usuarios" className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Limpar
            </Link>
          </div>
        </form>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full text-left text-sm">
            <thead className="bg-[var(--surface-card)] text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Visitor ID</th>
                <th className="px-4 py-3">Novo/Retornou</th>
                <th className="px-4 py-3">Cidade/Estado/País</th>
                <th className="px-4 py-3">Dispositivo</th>
                <th className="px-4 py-3">Sistema</th>
                <th className="px-4 py-3">Navegador</th>
                <th className="px-4 py-3">Idioma</th>
                <th className="px-4 py-3">Fuso horário</th>
                <th className="px-4 py-3">Primeira visita</th>
                <th className="px-4 py-3">Última visita</th>
                <th className="px-4 py-3">Páginas</th>
                <th className="px-4 py-3">Tempo total</th>
                <th className="px-4 py-3">Origem</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={13} className="px-4 py-6 text-center text-sm text-slate-400">
                    Nenhum visitante encontrado para os filtros atuais.
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => (
                  <tr key={visitor.visitorId} className="border-t border-[var(--border-subtle)]">
                    <td className="px-4 py-3 font-mono text-xs">
                      <Link href={`/admin/usuarios/${visitor.visitorId}`} className="hover:text-[var(--accent)]">
                        {visitor.visitorId}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{visitor.isReturning ? "Retornou" : "Novo"}</td>
                    <td className="px-4 py-3">
                      {[visitor.city, visitor.region, visitor.country].filter(Boolean).join(" / ") || "—"}
                    </td>
                    <td className="px-4 py-3">{visitor.deviceType || "—"}</td>
                    <td className="px-4 py-3">{visitor.os || "—"}</td>
                    <td className="px-4 py-3">{visitor.browser || "—"}</td>
                    <td className="px-4 py-3">{visitor.language || "—"}</td>
                    <td className="px-4 py-3">{visitor.timeZone || "—"}</td>
                    <td className="px-4 py-3">{visitor.firstVisit.toLocaleString("pt-BR")}</td>
                    <td className="px-4 py-3">{visitor.lastVisit.toLocaleString("pt-BR")}</td>
                    <td className="px-4 py-3">{visitor.totalPageViews}</td>
                    <td className="px-4 py-3">{formatDuration(visitor.totalTimeSeconds)}</td>
                    <td className="px-4 py-3">
                      {visitor.utmSource || visitor.referrer || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
