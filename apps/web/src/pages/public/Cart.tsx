import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatRupiah } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const items = [
    {
      id: 'c1',
      name: 'iPhone 15 Pro Max',
      storage: '256GB',
      color: 'Natural Titanium',
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4 flex flex-col sm:flex-row items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-[#111111]">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.storage} • {item.color}</p>
                <p className="text-sm font-extrabold text-[#111111]">{formatRupiah(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#111111] border-b border-gray-100 pb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#111111]">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimasi Ongkir</span>
                <span className="text-emerald-600 font-bold">Bebas Ongkir</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#111111]">Total Belanja</span>
              <span className="text-lg font-black text-[#111111]">{formatRupiah(subtotal)}</span>
            </div>
            <Link to="/checkout" className="block pt-2">
              <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Lanjut ke Checkout
              </Button>
            </Link>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
};
