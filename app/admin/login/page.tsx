'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Username atau Password salah');
      }

      const data = await res.json();
      
      // Save token to cookie securely
      document.cookie = `admin_token=${data.access_token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-ground flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border border-surface-section">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-color">Admin Studio</h1>
          <p className="text-text-color-secondary mt-2">Masuk untuk mengelola website</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-semibold text-text-color">Username</label>
            <InputText 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="p-3"
              placeholder="admin"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold text-text-color">Password</label>
            <Password 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              toggleMask 
              feedback={false}
              inputClassName="p-3 w-full"
              className="w-full"
              placeholder="••••••••"
              required 
            />
          </div>

          <Button 
            type="submit" 
            label={loading ? "Memproses..." : "Masuk"} 
            className="w-full font-bold p-3 mt-2" 
            disabled={loading} 
          />
        </form>
      </Card>
    </div>
  );
}
