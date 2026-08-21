import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatRupiah } from '@/lib/utils';
import { MessageCircle, Calculator, ShieldCheck, RefreshCw } from 'lucide-react';

export const TradeInPage: React.FC = () => {
  const [deviceModel, setDeviceModel] = useState('iPhone 13 Pro');
  const [storage, setStorage] = useState('128GB');
  const [condition, setCondition] = useState('Body Mulus (95%), Layar Normal');
  const [batteryHealth, setBatteryHealth] = useState('88');

  // Simple estimation calculation
  const getEstimatedValue = () => {
    let base = 9000000;
    if (deviceModel.includes('14')) base = 12000000;
    if (deviceModel.includes('15')) base = 16000000;
    if (deviceModel.includes('12')) base = 6500000;
    if (storage === '256GB') base += 1000000;
    if (storage === '512GB') base += 2000000;
    return base;
  };

  const estimatedValue = getEstimatedValue();

  return (
    <PageContainer
      title="Tukar Tambah (Trade In) iPhone"
      subtitle="Tukarkan iPhone lamamu dengan proses cepat, aman, dan dapatkan harga terbaik."
      breadcrumbs={[{ label: 'Trade In' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Calculator */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-6 border border-gray-200">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#E7B65A]" /> Kalkulator Estimasi Harga
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Model iPhone Lama"
                options={[
                  { value: 'iPhone 14 Pro Max', label: 'iPhone 14 Pro Max' },
                  { value: 'iPhone 14 Pro', label: 'iPhone 14 Pro' },
                  { value: 'iPhone 13 Pro', label: 'iPhone 13 Pro' },
                  { value: 'iPhone 13', label: 'iPhone 13' },
                  { value: 'iPhone 12 Pro', label: 'iPhone 12 Pro' },
                  { value: 'iPhone 12', label: 'iPhone 12' },
                ]}
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
              />

              <Select
                label="Kapasitas Penyimpanan"
                options={[
                  { value: '128GB', label: '128 GB' },
                  { value: '256GB', label: '256 GB' },
                  { value: '512GB', label: '512 GB' },
                  { value: '1TB', label: '1 TB' },
                ]}
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Kondisi Fisik & Fungsi"
                options={[
                  { value: 'Body Mulus (95%), Layar Normal', label: 'Body Mulus (95%+), Fungsi 100%' },
                  { value: 'Lecet Pemakaian Wajar', label: 'Lecet Pemakaian Wajar' },
                  { value: 'Ada Jamur / Dent Kecil', label: 'Ada Jamur / Dent Kecil' },
                ]}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />

              <Input
                label="Battery Health (%)"
                type="number"
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(e.target.value)}
                placeholder="Contoh: 88"
              />
            </div>

            <div className="p-6 bg-[#050505] text-white rounded-2xl border border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Estimasi Harga Tukar Tambah</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#E7B65A] mt-1">{formatRupiah(estimatedValue)}</p>
                </div>
                <Badge variant="accent" size="sm">Penawaran Instan</Badge>
              </div>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20fincell.id,%20saya%20ingin%20trade-in%20${encodeURIComponent(
                  deviceModel
                )}%20${storage}%20(Battery%20Health%20${batteryHealth}%25).%20Estimasi%20di%20web:%20${formatRupiah(
                  estimatedValue
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Button variant="whatsapp" size="lg" className="w-full" leftIcon={<MessageCircle className="w-5 h-5" />}>
                  Klaim Harga Trade In via WhatsApp
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4 border border-gray-200">
            <h4 className="text-sm font-bold text-[#111111]">Keuntungan Trade In di fincell.id</h4>
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-4 h-4 text-[#E7B65A] shrink-0 mt-0.5" />
                <p>Penilaian cepat & akurat tanpa potongan tersembunyi.</p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#E7B65A] shrink-0 mt-0.5" />
                <p>Jaminan keamanan hapus data menyeluruh (factory reset bersama).</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
};
