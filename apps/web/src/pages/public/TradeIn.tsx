import React, { useState } from 'react';
import { openWhatsApp, buildTradeInWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { SeoHead } from '@/components/common/SeoHead';

export const TradeInPage: React.FC = () => {
  const [device, setDevice] = useState('iPhone 14 Pro Max');
  const [storage, setStorage] = useState('128GB');
  const [condition, setCondition] = useState('Mulus (Layar & Bodi Tanpa Lecet)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('Lead', { content_name: 'Trade In Submission', device, storage, condition });
    const msg = buildTradeInWhatsAppMessage({ device, storage, condition });
    openWhatsApp(msg);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16">
      <SeoHead
        title="Layanan Trade In iPhone — vincellid"
        description="Tukar tambah iPhone lama Anda dengan generasi terbaru di vincellid. Proses cepat dan transparan via WhatsApp."
        canonicalUrl="https://vincellid.id/trade-in"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">TRADE IN SERVICE</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Tukar iPhone lamamu.
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-lg">
              Dapatkan estimasi nilai perangkatmu secara transparan dari tim vincellid dan gunakan nilai tersebut untuk upgrade ke iPhone impianmu.
            </p>

            {/* Process Steps */}
            <div className="grid grid-cols-2 gap-4 py-4 text-xs border-y border-[#262626]">
              <div>
                <span className="text-[#D6A84F] font-mono font-bold block text-base">01</span>
                <p className="text-white font-medium">Pilih perangkat</p>
              </div>
              <div>
                <span className="text-[#D6A84F] font-mono font-bold block text-base">02</span>
                <p className="text-white font-medium">Kirim detail</p>
              </div>
              <div>
                <span className="text-[#D6A84F] font-mono font-bold block text-base">03</span>
                <p className="text-white font-medium">Dapat estimasi</p>
              </div>
              <div>
                <span className="text-[#D6A84F] font-mono font-bold block text-base">04</span>
                <p className="text-white font-medium">Upgrade</p>
              </div>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-6 bg-[#101010] border border-[#262626] rounded-md p-8">
            <h2 className="text-xl font-bold text-white mb-6">Formulir Estimasi Trade In</h2>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div>
                <label className="block text-gray-300 uppercase font-semibold mb-2">Tipe iPhone Saat Ini</label>
                <input
                  type="text"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 uppercase font-semibold mb-2">Kapasitas Penyimpanan</label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                >
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 uppercase font-semibold mb-2">Kondisi Fisik &amp; Fungsi</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                >
                  <option value="Mulus (Layar & Bodi Tanpa Lecet)">Mulus (Layar &amp; Bodi Tanpa Lecet)</option>
                  <option value="Pemakaian Wajar (Goresan Halus)">Pemakaian Wajar (Goresan Halus)</option>
                  <option value="Ada Denta/Baret Dalam">Ada Dent/Baret Dalam</option>
                  <option value="Layar/Fungsi Bermasalah">Layar/Fungsi Bermasalah</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-md transition-colors text-center mt-4"
              >
                Mulai Trade In via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
