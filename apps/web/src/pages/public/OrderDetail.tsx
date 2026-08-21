import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { orderService } from '@/services/orderService';
import { formatRupiah } from '@/lib/utils';
import { Order } from '@fincell/shared';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      orderService.getOrderById(id).then((res) => {
        if (res.data) setOrder(res.data);
      });
    }
  }, [id]);

  if (!order) return null;

  return (
    <PageContainer
      title={`Detail Pesanan #${order.orderNumber}`}
      subtitle="Pantau status pesanan dan rincian transaksi Anda."
      breadcrumbs={[
        { label: 'Pesanan', href: '/pesanan/ord-1001' },
        { label: order.orderNumber },
      ]}
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Status Tracker */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Status Pesanan</p>
              <h3 className="text-lg font-bold text-[#111111] uppercase mt-0.5">{order.status}</h3>
            </div>
            <Badge variant="success" size="md">Pembayaran Lunas</Badge>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 text-center">
            <div className="space-y-1 text-emerald-600">
              <CheckCircle2 className="w-5 h-5 mx-auto" />
              <p className="text-[10px] font-bold">Menunggu</p>
            </div>
            <div className="space-y-1 text-emerald-600">
              <Clock className="w-5 h-5 mx-auto" />
              <p className="text-[10px] font-bold">Diproses</p>
            </div>
            <div className="space-y-1 text-gray-400">
              <Truck className="w-5 h-5 mx-auto" />
              <p className="text-[10px] font-bold">Dikirim</p>
            </div>
            <div className="space-y-1 text-gray-400">
              <Package className="w-5 h-5 mx-auto" />
              <p className="text-[10px] font-bold">Selesai</p>
            </div>
          </div>
        </Card>

        {/* Items & Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase text-gray-400">Penerima</h4>
            <div className="text-xs text-gray-700 space-y-1">
              <p className="font-bold text-[#111111]">{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}, {order.customer.city}, {order.customer.province}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase text-gray-400">Rincian Pembayaran</h4>
            <div className="text-xs text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatRupiah(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Diskon:</span>
                <span>-{formatRupiah(order.discountTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#111111] pt-2 border-t">
                <span>Total:</span>
                <span>{formatRupiah(order.total)}</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
};
