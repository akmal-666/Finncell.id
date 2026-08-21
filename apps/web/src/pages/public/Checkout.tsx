import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Lock } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pesanan/ord-1001');
  };

  return (
    <PageContainer
      title="Checkout Pesanan"
      subtitle="Lengkapi informasi pengiriman dan metode pembayaran Anda."
      breadcrumbs={[
        { label: 'Keranjang', href: '/keranjang' },
        { label: 'Checkout' },
      ]}
    >
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Customer Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#E7B65A]" /> Informasi Alamat Pengiriman
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Nama Lengkap *" defaultValue="Ahmad Rizky" required />
              <Input label="No. WhatsApp / HP *" defaultValue="081298765432" required />
            </div>
            <Input label="Email *" type="email" defaultValue="ahmad.rizky@gmail.com" required />
            <Input label="Alamat Lengkap *" defaultValue="Jl. Sudirman No. 45, Kebayoran Baru" required />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Kota / Kabupaten *" defaultValue="Jakarta Selatan" required />
              <Input label="Provinsi *" defaultValue="DKI Jakarta" required />
              <Input label="Kode Pos *" defaultValue="12190" required />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#E7B65A]" /> Pilih Metode Pembayaran
            </h3>
            <Select
              options={[
                { value: 'bca', label: 'Transfer Bank BCA (Manual / Virtual Account)' },
                { value: 'mandiri', label: 'Transfer Bank Mandiri' },
                { value: 'qris', label: 'QRIS / GoPay / OVO / Dana' },
              ]}
            />
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#111111] border-b border-gray-100 pb-3">Ringkasan Pembayaran</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Produk</span>
                <span className="font-bold text-[#111111]">{formatRupiah(24448000)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Diskon Voucher</span>
                <span>- {formatRupiah(500000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span className="font-bold text-[#111111]">{formatRupiah(50000)}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#111111]">Total Bayar</span>
              <span className="text-lg font-black text-[#111111]">{formatRupiah(23998000)}</span>
            </div>
            <Button variant="primary" size="lg" className="w-full" type="submit" leftIcon={<Lock className="w-4 h-4" />}>
              Buat Pesanan Sekarang
            </Button>
          </Card>
        </div>

      </form>
    </PageContainer>
  );
};
