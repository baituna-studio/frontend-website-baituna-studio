'use client';

import { Button } from 'primereact/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface-ground">
      <div className="text-center max-w-lg px-4">
        <div className="bg-red-50 text-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="pi pi-exclamation-triangle text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-text-color mb-4">Terjadi Kesalahan</h2>
        <p className="text-text-color-secondary mb-8 leading-relaxed">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi atau kembali ke halaman utama.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            label="Coba Lagi"
            icon="pi pi-refresh"
            onClick={reset}
            className="font-semibold"
          />
          <Button
            label="Ke Halaman Utama"
            icon="pi pi-home"
            severity="secondary"
            outlined
            onClick={() => (window.location.href = '/')}
            className="font-semibold"
          />
        </div>
      </div>
    </div>
  );
}
