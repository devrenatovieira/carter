import Image from 'next/image';

export default function ImageMosaic({
  title,
  eyebrow,
  images
}: {
  title: string;
  eyebrow?: string;
  images: string[];
}) {
  if (!images.length) return null;

  return (
    <section className="space-y-6">
      <div>
        {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{eyebrow}</p> : null}
        <h2 className="text-2xl font-serif">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {images.map((src, index) => (
          <div key={`${src}-${index}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--surface-muted)]">
            <Image
              src={src}
              alt={`Imagem de produto ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
