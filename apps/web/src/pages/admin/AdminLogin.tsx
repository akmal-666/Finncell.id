import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@fincell.id');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin');
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
          <p className="text-xs text-gray-400">Masuk untuk mengelola produk, pesanan, dan konfigurasi toko.</p>
        </div>

        {/* Card Form */}
        <Card variant="dark" className="p-8 space-y-4 border border-gray-800 shadow-2xl">
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
            <Button variant="secondary" size="lg" className="w-full" type="submit" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Masuk ke Dashboard
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-gray-600">
          fincell.id Secure Portal • Phase 01 System Foundation
        </p>

      </div>
    </div>
  );
};
