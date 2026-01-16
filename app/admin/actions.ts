"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db";
import { productSchema } from "@/lib/validation";
import { authOptions } from "@/lib/auth";

type ActionResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors?: Record<string, string>;
      formError?: string;
    };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {

    throw new Error("Não autorizado");
  }
}

function sanitizeText(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parsePriceToCents(value: string | null) {
  if (!value) return 0;

  // aceita "1,99", "1.999,90", "1999,90", "1999.90"
  const cleaned = value.replace(/[^\d,.-]/g, "").trim();
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;

  const num = Number(normalized);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
}

function parseList(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePayload(formData: FormData) {
  const price = parsePriceToCents(formData.get("price")?.toString() || null);

  const compareAtPriceRaw = formData.get("compareAtPrice")?.toString() || "";
  const compareAtPrice = compareAtPriceRaw.trim()
    ? parsePriceToCents(compareAtPriceRaw)
    : null;

  return {
    slug: formData.get("slug")?.toString() || "",
    title: sanitizeText(formData.get("title")?.toString() || ""),
    shortDescription: sanitizeText(formData.get("shortDescription")?.toString() || ""),
    description: sanitizeText(formData.get("description")?.toString() || ""),
    price,
    compareAtPrice,
    category: sanitizeText(formData.get("category")?.toString() || ""),
    tags: parseList(formData.get("tags")?.toString() || ""),
    rating: Number(formData.get("rating") || 0),
    images: parseList(formData.get("images")?.toString() || ""),
    deliveryType: (formData.get("deliveryType")?.toString() || "BOTH").toUpperCase(),
    pickupLocation: (() => {
      const raw = formData.get("pickupLocation")?.toString() || "";
      return raw ? sanitizeText(raw) : null;
    })(),
    isActive: formData.get("isActive") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isEditorPick: formData.get("isEditorPick") === "on",
    isFastShipping: formData.get("isFastShipping") === "on",
    isOfferOfTheDay: formData.get("isOfferOfTheDay") === "on",
    paymentLink: formData.get("paymentLink")?.toString() || "",
    affiliateParamKey: formData.get("affiliateParamKey")?.toString() || "afiliado",
    affiliateIdValue: formData.get("affiliateIdValue")?.toString() || "carter",
    soldCount: Number(formData.get("soldCount") || 0),
    manualRank: formData.get("manualRank") ? Number(formData.get("manualRank")) : null
  };
}

function zodToFieldErrors(error: any) {
  const fieldErrors: Record<string, string> = {};
  const issues = error?.issues || [];
  for (const it of issues) {
    const key = it?.path?.[0];
    const msg = it?.message;
    if (key && msg) fieldErrors[String(key)] = String(msg);
  }
  return fieldErrors;
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();

    const payload = normalizePayload(formData);

    // ✅ aqui é o ponto: sem parse (que dá throw), usando safeParse
    const parsed = productSchema.safeParse(payload);
    if (!parsed.success) {
      return { ok: false, fieldErrors: zodToFieldErrors(parsed.error) };
    }

    await prisma.product.create({ data: parsed.data });

    revalidatePath("/");
    revalidatePath("/catalogo");
    revalidatePath("/admin");

    return { ok: true };
  } catch (e: any) {
    const msg = String(e?.message || "Erro interno");

    if (msg.toLowerCase().includes("não autorizado")) {
      return { ok: false, formError: "Não autorizado. Faça login novamente." };
    }

    return { ok: false, formError: "Erro interno ao salvar. Veja o terminal do dev server." };
  }
}

export async function updateProduct(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const id = formData.get("id")?.toString();
    if (!id) return { ok: false, formError: "ID ausente." };

    const payload = normalizePayload(formData);
    const parsed = productSchema.safeParse(payload);
    if (!parsed.success) {
      return { ok: false, fieldErrors: zodToFieldErrors(parsed.error) };
    }

    await prisma.product.update({ where: { id }, data: parsed.data });
    revalidatePath("/");
    revalidatePath("/catalogo");
    revalidatePath("/admin");
    revalidatePath(`/produto/${parsed.data.slug}`);

    
    return { ok: true };
  } catch (e: any) {
    const msg = String(e?.message || "Erro interno");
    if (msg.toLowerCase().includes("não autorizado")) {
      return { ok: false, formError: "Não autorizado. Faça login novamente." };
    }
    return { ok: false, formError: "Erro interno ao atualizar. Veja o terminal do dev server." };
  }
}

export async function deleteProduct(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const id = formData.get("id")?.toString();
    if (!id) return { ok: false, formError: "ID ausente." };
    await prisma.product.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/catalogo");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e: any) {
    const msg = String(e?.message || "Erro interno");
    if (msg.toLowerCase().includes("não autorizado")) {
      return { ok: false, formError: "Não autorizado. Faça login novamente." };
    }
    return { ok: false, formError: "Erro interno ao excluir. Veja o terminal do dev server." };
  }
}

export async function deleteVisitor(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const visitorId = formData.get("visitorId")?.toString();
    if (!visitorId) return { ok: false, formError: "ID ausente." };
    await prisma.visitor.delete({ where: { visitorId } });
    revalidatePath("/admin/usuarios");
    revalidatePath(`/admin/usuarios/${visitorId}`);
    return { ok: true };
  } catch (e: any) {
    const msg = String(e?.message || "Erro interno");
    if (msg.toLowerCase().includes("não autorizado")) {
      return { ok: false, formError: "Não autorizado. Faça login novamente." };
    }
    return { ok: false, formError: "Erro interno ao excluir. Veja o terminal do dev server." };
  }
}
