'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative mb-4 aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--surface-muted)]"
      >
        <Image
          src={images[index]}
          alt={`Imagem ${index + 1}`}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </motion.div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border sm:h-20 sm:w-20 ${i === index ? 'border-[var(--accent)]' : 'border-[var(--border-subtle)]'}`}
            aria-label={`Selecionar imagem ${i + 1}`}
          >
            <div className="relative h-full w-full bg-[var(--surface-muted)]">
              <Image src={src} alt={`Thumb ${i + 1}`} fill style={{ objectFit: 'contain' }} sizes="80px" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
