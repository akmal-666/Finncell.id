import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  const items = [
    {
      id: 'c1',
      name: 'iPhone 16 Pro Max',
      storage: '256GB',
      color: 'Desert Titanium',
      price: 23999000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'c2',
      name: 'Adaptor Apple 20W USB-C',
      storage: 'Standard',
      color: 'White',
      price: 449000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageContainer
      title="Keranjang Belanja"
      subtitle="Periksa kembali daftar produk yang akan Anda pesan."
      breadcrumbs={[{ label: 'Keranjang' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        
        {/* Cart List Table / Rows */}
        <div className="lg:col-span-8 bg-white border border-[#DCE5EF] rounded-md p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-4 border-b border-[#DCE5EF] pb-3">
            Daftar Perangkat
          </h3>
          <div className="divide-y divide-[#DCE5EF]">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F7F9FC] border border-[#DCE5EF] rounded-md p-1 flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-14 object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#061426]">{item.name}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">{item.storage} • {item.color}</p>
                    <p className="text-sm font-black text-[#061426] mt-1">{formatRupiah(item.price)}</p>
                  </div>
                </div>
                
                <button className="text-gray-400 hover:text-red-500 p-2 transition-colors self-end sm:self-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-white border border-[#DCE5EF] rounded-md p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#061426] border-b border-[#DCE5EF] pb-3">
            Ringkasan Pesanan
          </h3>
          <div className="space-y-2 text-xs text-[#64748B]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#061426]">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pengiriman</span>
              <span className="text-[#1769E0] font-bold">Bebas Ongkir</span>
            </div>
          </div>
          
          <div className="border-t border-[#DCE5EF] pt-4 flex justify-between items-baseline">
            <span className="text-xs font-bold text-[#061426]">Total</span>
            <span className="text-lg font-black text-[#061426]">{formatRupiah(subtotal)}</span>
          </div>

          <Link to="/checkout" className="block pt-2">
            <Button size="lg" className="w-full bg-[#061426] hover:bg-[#1769E0] text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-md transition-colors" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Lanjut ke Checkout
            </Button>
          </Link>
        </div>

      </div>
    </PageContainer>
  );
};
