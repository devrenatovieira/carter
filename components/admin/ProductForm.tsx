"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/ImageUploader";
import { formatPriceBRL } from "@/lib/format";
import { Product } from "@/lib/types";

type ActionResult =
  | { ok: true }
  | { ok: false; fieldErrors?: Record<string, string>; formError?: string };

type FieldErrors = Record<string, string>;

function centsToInput(value?: number | null) {
  if (value == null) return "";
  return (value / 100).toFixed(2).replace(".", ",");
}

function parseCents(input: string) {
  if (!input) return 0;

  // aceita "1,99", "1.999,90", "1999,90", "1999.90"
  const cleaned = input.replace(/[^\d,.-]/g, "").trim();

  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;

  const num = Number(normalized);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
}

function formatBRLInput(value: string) {
  // mantém só dígitos
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  // garante centavos
  const padded = digits.padStart(3, "0");
  const cents = padded.slice(-2);
  let reais = padded.slice(0, -2);

  // remove zeros à esquerda
  reais = reais.replace(/^0+(?=\d)/, "");
  // separador de milhar
  reais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${reais},${cents}`;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // remove chars inválidos
    .trim()
    .replace(/\s+/g, "-") // espaços -> hífen (SÓ NO SLUG, não no título)
    .replace(/-+/g, "-"); // colapsa hífens
}

export default function ProductForm({
  title,
  action,
  product
}: {
  title: string;
  action: (formData: FormData) => Promise<ActionResult>;
  product?: Product | null;
}) {
  const router = useRouter();

  const categoryOptions = [
    "Perfumes",
    "Carro",
    "Massagem",
    "Papelaria",
    "Moda",
    "Tech",
    "Lifestyle",
    "Acessórios",
  ];

  const categoryList = Array.from(
    new Set([product?.category, ...categoryOptions].filter(Boolean))
  ) as string[];

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    slug: product?.slug || "",
    title: product?.title || "",
    shortDescription: product?.shortDescription || "",
    description: product?.description || "",
    price: centsToInput(product?.price ?? null),
    compareAtPrice: centsToInput(product?.compareAtPrice ?? null),
    category: product?.category || categoryOptions[0] || "",
    tags: product?.tags?.join(", ") || "",
    rating: product?.rating?.toString() || "0",
    images: product?.images?.join(", ") || "",
    deliveryType: product?.deliveryType || "BOTH",
    pickupLocation: product?.pickupLocation || "",
    isActive: product?.isActive ?? true,
    isFeatured: Boolean(product?.isFeatured),
    isEditorPick: Boolean(product?.isEditorPick),
    isFastShipping: Boolean(product?.isFastShipping),
    isOfferOfTheDay: Boolean(product?.isOfferOfTheDay),
    paymentLink: product?.paymentLink || "",
    soldCount: product?.soldCount?.toString() || "0",
    manualRank: product?.manualRank?.toString() || ""
  });

  const preview = useMemo(() => {
    const images = form.images
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const price = parseCents(form.price);
    const compareAt =
      form.compareAtPrice && form.compareAtPrice.trim()
        ? parseCents(form.compareAtPrice)
        : null;

    return { images, price, compareAt };
  }, [form]);

  const appendImage = (url: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images ? `${prev.images}, ${url}` : url
    }));
  };

  function clearFieldError(name: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  // validações rápidas no client (pra evitar request desnecessário)
  function clientValidate() {
    let ok = true;
    const nextErrors: FieldErrors = {};

    const s = slugify(form.slug);
    if (!s || s.length < 3 || !/^[a-z0-9-]+$/.test(s)) {
      nextErrors.slug = "Slug inválido (use letras minúsculas, números e hífen)";
      ok = false;
    }

    if ((form.shortDescription || "").trim().length < 10) {
      nextErrors.shortDescription = "Resumo precisa ter pelo menos 10 caracteres";
      ok = false;
    }

    if ((form.description || "").trim().length < 10) {
      nextErrors.description = "Descrição precisa ter pelo menos 10 caracteres";
      ok = false;
    }

    const priceCents = parseCents(form.price);
    const compareCents = form.compareAtPrice?.trim()
      ? parseCents(form.compareAtPrice)
      : null;

    if (compareCents != null && compareCents > 0 && compareCents < priceCents) {
      nextErrors.compareAtPrice =
        "Preço “de” (compareAtPrice) não pode ser menor que o preço atual.";
      ok = false;
    }

    if (form.deliveryType !== "DELIVERY" && !form.pickupLocation.trim()) {
      nextErrors.pickupLocation = "Local de retirada é obrigatório para retirada.";
      ok = false;
    }

    // paymentLink precisa existir (e a validação real de URL fica no server)
    if (!form.paymentLink.trim()) {
      nextErrors.paymentLink = "Informe o link de pagamento.";
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  }

  async function safeAction(fd: FormData) {
    try {
      setSubmitting(true);
      setErrors({});

      // normaliza slug no envio (garantia final)
      fd.set("slug", slugify(fd.get("slug")?.toString() || ""));

      // Se compareAtPrice estiver vazio, remove do FormData pra não virar 0
      const cap = fd.get("compareAtPrice")?.toString()?.trim() || "";
      if (!cap) fd.delete("compareAtPrice");

      const res = await action(fd);

      if (!res?.ok) {
        if (res.fieldErrors) setErrors(res.fieldErrors);
        if (res.formError) setErrors((prev) => ({ ...prev, _form: res.formError ?? "" }));
        return;
      }

      // ✅ depois de cadastrar/editar, volta para a tela de gerenciamento
      router.replace("/admin");
      router.refresh();
    } catch (err: any) {
      const fallback = "Não foi possível salvar. Verifique os campos.";
      setErrors({ _form: String(err?.message || fallback) });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr,0.8fr]">
      <form
        action={async (fd) => {
          if (submitting) return;
          if (!clientValidate()) return;
          await safeAction(fd);
        }}
        className="space-y-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6"
      >
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Formulário
          </p>
          <h2 className="text-2xl font-serif">{title}</h2>
        </div>

        {errors._form ? (
          <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
            {errors._form}
          </div>
        ) : null}

        {product?.id && <input type="hidden" name="id" value={product.id} />}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* SLUG */}
          <label className="text-sm">
            Slug (URL)
            <input
              name="slug"
              value={form.slug}
              onChange={(e) => {
                const next = slugify(e.target.value);
                setForm((prev) => ({ ...prev, slug: next }));
                if (errors.slug) clearFieldError("slug");
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              placeholder="ex: perfume-arabe-luxo"
              required
              autoComplete="off"
            />
            {errors.slug ? (
              <p className="mt-2 text-xs text-red-300">{errors.slug}</p>
            ) : null}
            <p className="mt-1 text-xs text-slate-400">
              Usado no link do produto. Apenas letras minúsculas, números e hífen.
            </p>
          </label>

          {/* TÍTULO (nome do produto com ESPAÇO - sem hífen) */}
          <label className="text-sm">
            Nome do produto
            <input
              name="title"
              value={form.title}
              onChange={(e) => {
                const nextTitle = e.target.value;

                setForm((prev) => {
                  const prevAutoSlug = slugify(prev.title || "");
                  const shouldAutoGenerate = !prev.slug || prev.slug === prevAutoSlug;

                  return {
                    ...prev,
                    title: nextTitle,
                    // ✅ gera slug automático, mas o TÍTULO continua com espaço normal
                    slug: shouldAutoGenerate ? slugify(nextTitle) : prev.slug
                  };
                });
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              placeholder="Ex: Perfume Árabe Luxo"
              required
            />
          </label>
        </div>

        <label className="text-sm">
          Descrição curta
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={(e) => {
              setForm({ ...form, shortDescription: e.target.value });
              if (errors.shortDescription) clearFieldError("shortDescription");
            }}
            className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            placeholder="Mínimo 10 caracteres"
            required
          />
          {errors.shortDescription ? (
            <p className="mt-2 text-xs text-red-300">{errors.shortDescription}</p>
          ) : null}
        </label>

        <label className="text-sm">
          Descrição completa
          <textarea
            name="description"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
              if (errors.description) clearFieldError("description");
            }}
            className="mt-2 h-32 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            placeholder="Mínimo 10 caracteres"
            required
          />
          {errors.description ? (
            <p className="mt-2 text-xs text-red-300">{errors.description}</p>
          ) : null}
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="text-sm">
            Preço (R$)
            <input
              name="price"
              type="text"
              inputMode="numeric"
              placeholder="Ex: 1,99"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: formatBRLInput(e.target.value) })}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              required
            />
          </label>

          <label className="text-sm">
            Preço comparativo (R$)
            <input
              name="compareAtPrice"
              type="text"
              inputMode="numeric"
              placeholder="Ex: 9,99 (opcional)"
              value={form.compareAtPrice}
              onChange={(e) => {
                setForm({ ...form, compareAtPrice: formatBRLInput(e.target.value) });
                if (errors.compareAtPrice) clearFieldError("compareAtPrice");
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            />
            {errors.compareAtPrice ? (
              <p className="mt-2 text-xs text-red-300">{errors.compareAtPrice}</p>
            ) : null}
          </label>

          <label className="text-sm">
            Avaliação (0-5)
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            Categoria
            <select
              name="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              required
            >
              {categoryList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            Tags (separadas por vírgula)
            <input
              name="tags"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              placeholder="ex: importado, premium, oferta"
            />
          </label>
        </div>

        <label className="text-sm">
          Imagens (URLs separadas por vírgula)
          <input
            name="images"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            placeholder="ex: /images/produto.jpg, https://..."
            required
          />
          {errors.images ? <p className="mt-2 text-xs text-red-300">{errors.images}</p> : null}
        </label>

        <ImageUploader onUploaded={appendImage} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            Tipo de entrega
            <select
              name="deliveryType"
              value={form.deliveryType}
              onChange={(e) => {
                setForm({ ...form, deliveryType: e.target.value });
                if (errors.pickupLocation) clearFieldError("pickupLocation");
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              required
            >
              <option value="DELIVERY">Delivery</option>
              <option value="PICKUP">Retirada</option>
              <option value="BOTH">Ambos</option>
            </select>
          </label>

          <label className="text-sm">
            Local de retirada
            <input
              name="pickupLocation"
              value={form.pickupLocation}
              onChange={(e) => {
                setForm({ ...form, pickupLocation: e.target.value });
                if (errors.pickupLocation) clearFieldError("pickupLocation");
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              placeholder="Ex: Rua X, 123 - Centro"
              required={form.deliveryType !== "DELIVERY"}
              disabled={form.deliveryType === "DELIVERY"}
            />
            {errors.pickupLocation ? (
              <p className="mt-2 text-xs text-red-300">{errors.pickupLocation}</p>
            ) : null}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            Link Shopay-Canvi
            <input
              name="paymentLink"
              value={form.paymentLink}
              onChange={(e) => {
                setForm({ ...form, paymentLink: e.target.value });
                if (errors.paymentLink) clearFieldError("paymentLink");
              }}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
              placeholder="https://..."
              required
            />
            {errors.paymentLink ? (
              <p className="mt-2 text-xs text-red-300">{errors.paymentLink}</p>
            ) : null}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-sm">
            Vendidos
            <input
              name="soldCount"
              type="number"
              min="0"
              value={form.soldCount}
              onChange={(e) => setForm({ ...form, soldCount: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            />
          </label>

          <label className="text-sm">
            Ranking manual
            <input
              name="manualRank"
              type="number"
              min="0"
              value={form.manualRank}
              onChange={(e) => setForm({ ...form, manualRank: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border-subtle)] bg-transparent p-3"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          Produto ativo
        </label>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["isFeatured", "Destaque"],
            ["isEditorPick", "Curadoria"],
            ["isFastShipping", "Envio rápido"],
            ["isOfferOfTheDay", "Oferta do dia"]
          ].map(([name, label]) => (
            <label key={name} className="flex items-center gap-2">
              <input
                name={name}
                type="checkbox"
                checked={(form as any)[name]}
                onChange={(e) => setForm({ ...form, [name]: e.target.checked } as any)}
              />
              {label}
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Salvando..." : "Salvar produto"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Voltar
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Prévia</p>

        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
            {preview.images[0] ? (
              <img
                src={preview.images[0]}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          <div className="mt-4 text-sm font-medium">
            {form.title || "Título do produto"}
          </div>

          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {form.category || "Categoria"}
          </div>

          <div className="mt-2 text-base font-serif">
            {formatPriceBRL(preview.price || 0)}
          </div>

          {preview.compareAt ? (
            <div className="text-xs text-slate-400 line-through">
              {formatPriceBRL(preview.compareAt)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
