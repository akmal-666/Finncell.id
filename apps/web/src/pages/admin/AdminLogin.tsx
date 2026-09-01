import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

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
          <div className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <span>vincellid</span>
            <span className="w-2 h-2 rounded-full bg-[#D6A84F]" />
          </div>
          <h2 className="text-lg font-extrabold text-gray-200 uppercase tracking-wider">Portal Internal Admin</h2>
          <p className="text-xs text-gray-400">Otentikasi aman untuk pengelolaan produk, konten, dan konfigurasi toko.</p>
        </div>

        {/* Card Form */}
        <div className="bg-[#101010] border border-[#262626] rounded-md p-8 space-y-5 shadow-2xl">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">Email Administrator</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#050505] border border-[#262626] rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A84F]"
                  required
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">Kata Sandi</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#050505] border border-[#262626] rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A84F]"
                  required
                />
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Memproses...' : 'Masuk Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-gray-600 font-mono">
          vincellid Secure Portal • Internal Access Only
        </p>

      </div>
    </div>
  );
};
