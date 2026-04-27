'use client';

import { useState, useRef } from 'react';
import { Metadata } from 'next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!form.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!form.message.trim()) newErrors.message = 'Pesan wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message,
          source: 'contact-page',
        }),
      });

      if (!res.ok) {
        throw new Error('Gagal mengirim pesan');
      }

      toast.current?.show({
        severity: 'success',
        summary: 'Terkirim!',
        detail: 'Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda.',
        life: 5000,
      });

      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
        life: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-text-color mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <InputText
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full ${errors.name ? 'p-invalid' : ''}`}
            placeholder="Masukkan nama lengkap"
          />
          {errors.name && <small className="text-red-500 mt-1 block">{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-color mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <InputText
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full ${errors.email ? 'p-invalid' : ''}`}
            placeholder="email@contoh.com"
          />
          {errors.email && <small className="text-red-500 mt-1 block">{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-text-color mb-2">
            No. WhatsApp <span className="text-text-color-secondary text-xs">(opsional)</span>
          </label>
          <InputText
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full"
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-text-color mb-2">
            Pesan <span className="text-red-500">*</span>
          </label>
          <InputTextarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            className={`w-full ${errors.message ? 'p-invalid' : ''}`}
            placeholder="Tuliskan pesan atau pertanyaan Anda..."
          />
          {errors.message && <small className="text-red-500 mt-1 block">{errors.message}</small>}
        </div>

        <Button
          type="submit"
          label={loading ? 'Mengirim...' : 'Kirim Pesan'}
          icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-send'}
          className="w-full font-bold shadow-md"
          disabled={loading}
        />
      </form>
    </>
  );
}
