"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ImageUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data?.url) onUploaded(data.url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="text-sm"
      />
      <Button type="button" variant="outline" onClick={upload} disabled={!file || loading}>
        {loading ? 'Enviando...' : 'Enviar imagem'}
      </Button>
    </div>
  );
}
