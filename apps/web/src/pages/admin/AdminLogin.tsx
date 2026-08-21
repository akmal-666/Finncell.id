import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@fincell.id');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(result.message || 'Login gagal. Periksa kembali email dan password.');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan koneksi ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <ShieldCheck className="w-6 h-6 text-[#E7B65A]" />
            <span><span className="text-[#E7B65A]">fincell</span>.id</span>
          </Link>
          <h2 className="text-xl font-extrabold text-white">Portal Admin Platform</h2>
          <p className="text-xs text-gray-400">Masuk untuk mengelola produk, pesanan, SEO, dan konfigurasi toko.</p>
        </div>

        {/* Card Form */}
        <Card variant="dark" className="p-8 space-y-4 border border-gray-800 shadow-2xl">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Administrator"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              className="bg-[#1A1A1A] border-gray-800 text-white placeholder-gray-500 focus:border-[#E7B65A]"
              required
            />
            <Input
              label="Kata Sandi"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              className="bg-[#1A1A1A] border-gray-800 text-white placeholder-gray-500 focus:border-[#E7B65A]"
              required
            />
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              type="submit"
              isLoading={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Masuk ke Dashboard
            </Button>
          </form>
        </Card>

        {/* Demo credentials tip */}
        <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl text-[11px] text-gray-400 space-y-1">
          <p className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">Credential Default Admin:</p>
          <p className="font-mono">Email: <span className="text-[#E7B65A]">admin@fincell.id</span></p>
          <p className="font-mono">Password: <span className="text-[#E7B65A]">admin123</span></p>
        </div>

        <p className="text-center text-xs text-gray-600">
          fincell.id Secure Admin Portal • Phase 10 Authentication & RBAC
        </p>

      </div>
    </div>
  );
};
