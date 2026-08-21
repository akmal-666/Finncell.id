import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { SeoHead } from '@/components/common/SeoHead';
import { tradeInService } from '@/services/tradeInService';
import { formatRupiah } from '@/lib/utils';
import {
  MessageCircle,
  Calculator,
  ShieldCheck,
  RefreshCw,
  Zap,
  CheckCircle2,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Phone
} from 'lucide-react';

export const TradeInPage: React.FC = () => {
  const { toast } = useToast();

  // Settings WhatsApp Number
  const whatsappNumber = '6281234567890';

  // Calculator Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deviceModel, setDeviceModel] = useState('iPhone 14 Pro Max');
  const [storage, setStorage] = useState('256GB');
  const [color, setColor] = useState('Natural Titanium');
  const [condition, setCondition] = useState('Body Mulus (95%+), Fungsi 100%');
  const [kelengkapan, setKelengkapan] = useState('Fullset Original');
  const [batteryHealth, setBatteryHealth] = useState('88');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Valuation Calculation Engine
  const calculateValuation = () => {
    let base = 7000000;

    // Model Base
    if (deviceModel.includes('15 Pro Max')) base = 18500000;
    else if (deviceModel.includes('15 Pro')) base = 15500000;
    else if (deviceModel.includes('15 Plus')) base = 12500000;
    else if (deviceModel.includes('15')) base = 11000000;
    else if (deviceModel.includes('14 Pro Max')) base = 14000000;
    else if (deviceModel.includes('14 Pro')) base = 12000000;
    else if (deviceModel.includes('14 Plus')) base = 9500000;
    else if (deviceModel.includes('14')) base = 8800000;
    else if (deviceModel.includes('13 Pro Max')) base = 10500000;
    else if (deviceModel.includes('13 Pro')) base = 9200000;
    else if (deviceModel.includes('13')) base = 7200000;
    else if (deviceModel.includes('12 Pro Max')) base = 7800000;
    else if (deviceModel.includes('12 Pro')) base = 6800000;
    else if (deviceModel.includes('12')) base = 5200000;
    else if (deviceModel.includes('11')) base = 3800000;

    // Storage multiplier
    if (storage === '256GB') base += 800000;
    if (storage === '512GB') base += 1800000;
    if (storage === '1TB') base += 3000000;

    // Condition penalty
    if (condition.includes('Lecet Pemakaian')) base -= 500000;
    if (condition.includes('Jamur / Dent')) base -= 1000000;
    if (condition.includes('Layar Retak')) base -= 2200000;

    // Kelengkapan adjustment
    if (kelengkapan === 'Unit Only') base -= 400000;
    if (kelengkapan === 'Charger Non-Ori') base -= 200000;

    // Battery Health penalty
    const bh = parseInt(batteryHealth) || 88;
    if (bh < 80) base -= 500000;

    return Math.max(base, 1500000);
  };

  const estimatedValue = calculateValuation();

  // Prefilled WhatsApp Message Text
  const getWhatsAppMessage = () => {
    return (
      `Halo fincell.id,\n\n` +
      `Saya ingin melakukan Trade In iPhone.\n\n` +
      `Nama: ${customerName || '-'}\n` +
      `Model: ${deviceModel}\n` +
      `Storage: ${storage}\n` +
      `Warna: ${color}\n` +
      `Kondisi: ${condition}\n` +
      `Kelengkapan: ${kelengkapan}\n` +
      `Battery Health: ${batteryHealth}%\n` +
      (notes ? `Catatan: ${notes}\n` : '') +
      `\nEstimasi di web: ${formatRupiah(estimatedValue)}`
    );
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  const handleSubmitOnline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      toast('Data Belum Lengkap', {
        type: 'warning',
        message: 'Mohon isi Nama Lengkap & Nomor WhatsApp Anda.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await tradeInService.submitTradeIn({
        customerName,
        customerPhone,
        deviceModel,
        storage,
        color,
        condition,
        kelengkapan,
        batteryHealth: parseInt(batteryHealth) || 88,
        estimatedValue,
        notes,
      });

      if (res.success) {
        toast('Pengajuan Berhasil Dikirim', {
          type: 'success',
          message: 'Pengajuan Trade In Anda telah tercatat. Melanjutkan ke WhatsApp...',
        });
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1000);
      }
    } catch {
      toast('Gagal Mengirim', {
        type: 'error',
        message: 'Terjadi kesalahan. Anda dapat langsung mengklik tombol WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Tukar Tambah (Trade In) iPhone — Harga Terbaik"
        description="Tukarkan iPhone lamamu di fincell.id. Dapatkan penawaran harga pasar terbaik instan via WhatsApp, proses transparan 15 menit, dan potongan langsung."
        canonicalUrl="https://fincell.id/trade-in"
      />

      <div className="space-y-16 pb-20">
        
        {/* 1. HERO SECTION */}
        <section className="relative bg-[#050505] text-white py-16 sm:py-20 overflow-hidden border-b border-white/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E7B65A]/12 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <Badge variant="accent" size="md" className="inline-flex items-center gap-1.5 bg-[#E7B65A]/15 text-[#E7B65A] border-[#E7B65A]/30">
              <Sparkles className="w-3.5 h-3.5" />
              Layanan Tukar Tambah iPhone Terpercaya
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Tukar iPhone lamamu.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#E7B65A]">
                Dapat harga terbaik.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Dapatkan taksiran harga pasar tertinggi untuk unit iPhone lamamu, proses pemeriksaan 15 menit, dan potongan langsung untuk pembelian seri iPhone terbaru.
            </p>

            <div className="pt-2 flex justify-center">
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <Button variant="whatsapp" size="lg" className="font-extrabold shadow-xl text-sm" leftIcon={<MessageCircle className="w-5 h-5" />}>
                  Tukar Sekarang via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        <PageContainer breadcrumbs={[{ label: 'Trade In' }]}>
          <div className="space-y-16">
            
            {/* 2. BENEFITS (4 Pillars) */}
            <section className="space-y-6">
              <div className="text-center space-y-1 max-w-xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">Keunggulan Trade In fincell.id</h2>
                <p className="text-xs text-gray-500">Transparan, akurat, dan tanpa biaya tersembunyi</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-2 hover:shadow-lg transition-all">
                  <div className="p-3 bg-amber-50 text-[#B88632] rounded-xl w-fit">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#111111]">Mudah</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Tanpa prosedur rumit. Tim kami bantu backup data & factory reset unit secara aman.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-2 hover:shadow-lg transition-all">
                  <div className="p-3 bg-amber-50 text-[#B88632] rounded-xl w-fit">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#111111]">Cepat</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Estimasi penawaran harga instan dalam 2 menit via WhatsApp tanpa perlu menunggu lama.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-2 hover:shadow-lg transition-all">
                  <div className="p-3 bg-amber-50 text-[#B88632] rounded-xl w-fit">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#111111]">Aman</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Jaminan 100% amanah dengan perlindungan kerahasiaan data pribadi pelanggan.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-2 hover:shadow-lg transition-all">
                  <div className="p-3 bg-amber-50 text-[#B88632] rounded-xl w-fit">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#111111]">Hemat</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Potongan harga instan yang bikin upgrade ke iPhone impian jadi jauh lebih hemat.
                  </p>
                </div>

              </div>
            </section>

            {/* 3. PROCESS (4 Steps) */}
            <section className="space-y-6">
              <div className="text-center space-y-1 max-w-xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">Alur Proses Trade In (4 Langkah)</h2>
                <p className="text-xs text-gray-500">Cara praktis menukarkan iPhone lamamu hari ini</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: '1', title: 'Chat WhatsApp', desc: 'Klik tombol WhatsApp untuk berkonsultasi dengan CS fincell.id.' },
                  { step: '2', title: 'Kirim Informasi iPhone', desc: 'Kirimkan detail seri, kapasitas, kondisi fisik, & foto iPhone lamamu.' },
                  { step: '3', title: 'Dapatkan Estimasi', desc: 'Tim spesialis kami akan memberikan penawaran harga terbaik instan.' },
                  { step: '4', title: 'Tukar & Hemat', desc: 'Kirim unit atau datang ke store, lalu terima iPhone impianmu.' }
                ].map((s) => (
                  <div key={s.step} className="p-6 bg-[#111111] text-white rounded-2xl space-y-3 relative overflow-hidden border border-gray-800">
                    <span className="text-3xl font-black text-[#E7B65A]/40 absolute top-3 right-4">{s.step}</span>
                    <h3 className="text-sm font-bold text-white relative z-10">{s.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed relative z-10">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. CALCULATOR & SUBMISSION FORM */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-6">
                <Card className="p-6 sm:p-8 space-y-6 border border-gray-200/80 shadow-md">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <h3 className="text-base font-extrabold text-[#111111] flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#E7B65A]" /> Kalkulator Estimasi Harga Trade In
                    </h3>
                    <Badge variant="accent" size="sm">Taksiran Instan</Badge>
                  </div>

                  <form onSubmit={handleSubmitOnline} className="space-y-6">
                    
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <Input
                        label="Nama Lengkap"
                        placeholder="Contoh: Budi Santoso"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                      <Input
                        label="Nomor WhatsApp"
                        placeholder="Contoh: 081234567890"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
                        required
                      />
                    </div>

                    {/* Device Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Select
                        label="Model iPhone Lama"
                        options={[
                          { value: 'iPhone 15 Pro Max', label: 'iPhone 15 Pro Max' },
                          { value: 'iPhone 15 Pro', label: 'iPhone 15 Pro' },
                          { value: 'iPhone 15 Plus', label: 'iPhone 15 Plus' },
                          { value: 'iPhone 15', label: 'iPhone 15' },
                          { value: 'iPhone 14 Pro Max', label: 'iPhone 14 Pro Max' },
                          { value: 'iPhone 14 Pro', label: 'iPhone 14 Pro' },
                          { value: 'iPhone 14', label: 'iPhone 14' },
                          { value: 'iPhone 13 Pro Max', label: 'iPhone 13 Pro Max' },
                          { value: 'iPhone 13 Pro', label: 'iPhone 13 Pro' },
                          { value: 'iPhone 13', label: 'iPhone 13' },
                          { value: 'iPhone 12 Pro Max', label: 'iPhone 12 Pro Max' },
                          { value: 'iPhone 12', label: 'iPhone 12' },
                          { value: 'iPhone 11', label: 'iPhone 11' },
                        ]}
                        value={deviceModel}
                        onChange={(e) => setDeviceModel(e.target.value)}
                      />

                      <Select
                        label="Storage"
                        options={[
                          { value: '64GB', label: '64 GB' },
                          { value: '128GB', label: '128 GB' },
                          { value: '256GB', label: '256 GB' },
                          { value: '512GB', label: '512 GB' },
                          { value: '1TB', label: '1 TB' },
                        ]}
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                      />

                      <Select
                        label="Warna"
                        options={[
                          { value: 'Natural Titanium', label: 'Natural Titanium' },
                          { value: 'Black Titanium', label: 'Black Titanium' },
                          { value: 'Blue Titanium', label: 'Blue Titanium' },
                          { value: 'White Titanium', label: 'White Titanium' },
                          { value: 'Midnight', label: 'Midnight' },
                          { value: 'Starlight', label: 'Starlight' },
                          { value: 'Space Gray', label: 'Space Gray' },
                        ]}
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Select
                        label="Kondisi Fisik & Fungsi"
                        options={[
                          { value: 'Body Mulus (95%+), Fungsi 100%', label: 'Body Mulus (95%+), Fungsi 100%' },
                          { value: 'Lecet Pemakaian Wajar', label: 'Lecet Pemakaian Wajar' },
                          { value: 'Ada Jamur / Dent Kecil', label: 'Ada Jamur / Dent Kecil' },
                          { value: 'Layar Retak / Minus Fungsi', label: 'Layar Retak / Minus Fungsi' },
                        ]}
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                      />

                      <Select
                        label="Kelengkapan Paket"
                        options={[
                          { value: 'Fullset Original', label: 'Fullset Original (Dus + Kabel)' },
                          { value: 'Unit Only', label: 'Unit Only (Batangan)' },
                          { value: 'Charger Non-Ori', label: 'Unit + Charger Non-Ori' },
                        ]}
                        value={kelengkapan}
                        onChange={(e) => setKelengkapan(e.target.value)}
                      />

                      <Input
                        label="Battery Health (%)"
                        type="number"
                        placeholder="88"
                        value={batteryHealth}
                        onChange={(e) => setBatteryHealth(e.target.value)}
                      />
                    </div>

                    <Textarea
                      label="Catatan Tambahan (Opsional)"
                      placeholder="Sebutkan jika ada bonus case, temperglass, atau keterangan kondisi khusus..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                    />

                    {/* Valuation Display Card */}
                    <div className="p-6 bg-[#050505] text-white rounded-3xl border border-gray-800 space-y-4 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400 font-medium">Estimasi Penawaran Trade In</p>
                          <p className="text-2xl sm:text-4xl font-black text-[#E7B65A] mt-1">
                            {formatRupiah(estimatedValue)}
                          </p>
                        </div>
                        <Badge variant="accent" size="md">Harga Pasar Tertinggi</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="block">
                          <Button variant="whatsapp" size="lg" className="w-full font-bold" leftIcon={<MessageCircle className="w-5 h-5" />}>
                            Klaim via WhatsApp
                          </Button>
                        </a>

                        <Button
                          type="submit"
                          variant="secondary"
                          size="lg"
                          isLoading={isSubmitting}
                          className="w-full font-bold"
                          leftIcon={<Send className="w-4 h-4" />}
                        >
                          Kirim Pengajuan Online
                        </Button>
                      </div>
                    </div>

                  </form>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="p-6 space-y-4 border border-gray-200/80">
                  <h4 className="text-sm font-extrabold text-[#111111]">Jaminan Layanan Trade In</h4>
                  <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#B88632] shrink-0 mt-0.5" />
                      <p>Pemeriksaan unit dilakukan secara transparan di depan konsumen.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <RefreshCw className="w-4 h-4 text-[#B88632] shrink-0 mt-0.5" />
                      <p>Menerima tukar tambah untuk semua varian iPhone bergaransi resmi maupun iBox.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#B88632] shrink-0 mt-0.5" />
                      <p>Proses kilat 15 menit selesai di tempat tanpa menunggu lama.</p>
                    </div>
                  </div>
                </Card>
              </div>

            </section>

          </div>
        </PageContainer>
      </div>
    </>
  );
};
