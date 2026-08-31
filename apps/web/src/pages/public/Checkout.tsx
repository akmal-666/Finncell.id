import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { SeoHead } from '@/components/common/SeoHead';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pesanan/ord-1001');
  };

  return (
    <>
      <SeoHead
        title="Checkout — fincell.id"
        description="Lengkapi pesanan iPhone Anda di fincell.id dengan transaksi aman."
        canonicalUrl="https://fincell.id/checkout"
      />

      <PageContainer
        title="Checkout Pesanan"
        subtitle="Lengkapi informasi pengiriman dan metode pembayaran Anda."
        breadcrumbs={[
          { label: 'Keranjang', href: '/keranjang' },
          { label: 'Checkout' },
        ]}
      >
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Main Form (8 Cols): Section 1 Customer & Section 2 Shipping */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Customer Information */}
            <div className="bg-white border border-[#DCE5EF] rounded-md p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#061426] border-b border-[#DCE5EF] pb-3">
                01. Informasi Pelanggan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Nama Lengkap *" defaultValue="Ahmad Rizky" required />
                <Input label="No. WhatsApp / HP *" defaultValue="081298765432" required />
              </div>
              <Input label="Email *" type="email" defaultValue="ahmad.rizky@gmail.com" required />
            </div>

            {/* 2. Shipping & Payment */}
            <div className="bg-white border border-[#DCE5EF] rounded-md p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#061426] border-b border-[#DCE5EF] pb-3">
                02. Alamat Pengiriman &amp; Pembayaran
              </h3>
              <Input label="Alamat Lengkap *" defaultValue="Jl. Sudirman No. 45, Kebayoran Baru" required />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="Kota / Kabupaten *" defaultValue="Jakarta Selatan" required />
                <Input label="Provinsi *" defaultValue="DKI Jakarta" required />
                <Input label="Kode Pos *" defaultValue="12190" required />
              </div>
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#061426] mb-1">Metode Pembayaran</label>
                <Select
                  options={[
                    { value: 'bca', label: 'Transfer Bank BCA (Virtual Account)' },
                    { value: 'mandiri', label: 'Transfer Bank Mandiri' },
                    { value: 'qris', label: 'QRIS / E-Wallet' },
                  ]}
                />
              </div>
            </div>

          </div>

          {/* 3. Order Summary (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-[#DCE5EF] rounded-md p-6 space-y-4 h-fit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#061426] border-b border-[#DCE5EF] pb-3">
              03. Ringkasan Pesanan
            </h3>

            <div className="space-y-3 text-xs text-[#64748B]">
              <div className="flex justify-between border-b border-[#DCE5EF] pb-2">
                <div>
                  <p className="font-bold text-[#061426]">iPhone 16 Pro Max</p>
                  <p className="text-[10px]">256GB • Desert Titanium</p>
                </div>
                <span className="font-bold text-[#061426]">{formatRupiah(23999000)}</span>
              </div>
              <div className="flex justify-between border-b border-[#DCE5EF] pb-2">
                <div>
                  <p className="font-bold text-[#061426]">Adaptor 20W USB-C</p>
                  <p className="text-[10px]">Standard • White</p>
                </div>
                <span className="font-bold text-[#061426]">{formatRupiah(449000)}</span>
              </div>

              <div className="flex justify-between pt-2">
                <span>Pengiriman</span>
                <span className="text-[#1769E0] font-bold">Bebas Ongkir</span>
              </div>
            </div>

            <div className="border-t border-[#DCE5EF] pt-4 flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#061426]">Total Pembayaran</span>
              <span className="text-lg font-black text-[#061426]">{formatRupiah(24448000)}</span>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#061426] hover:bg-[#1769E0] text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-md transition-colors"
              type="submit"
              leftIcon={<Lock className="w-4 h-4" />}
            >
              Buat Pesanan Sekarang
            </Button>
          </div>

        </form>
      </PageContainer>
    </>
  );
};
