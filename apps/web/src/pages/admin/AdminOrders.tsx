import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_ORDERS } from '@/services/mockData';
import { formatRupiah } from '@/lib/utils';
import { Eye, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOrdersPage: React.FC = () => {
  return (
    <PageContainer
      title="Manajemen Pesanan"
      subtitle="Pantau status transaksi, konfirmasi pembayaran, dan input resi pengiriman."
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Metode Pembayaran</TableHead>
              <TableHead>Total Transaksi</TableHead>
              <TableHead>Status Pesanan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono font-bold text-[#111111]">{o.orderNumber}</TableCell>
                <TableCell>
                  <p className="font-bold text-xs">{o.customer.name}</p>
                  <p className="text-[10px] text-gray-400">{o.customer.phone}</p>
                </TableCell>
                <TableCell className="text-xs">{o.paymentMethod}</TableCell>
                <TableCell className="font-bold text-xs">{formatRupiah(o.total)}</TableCell>
                <TableCell>
                  <Badge variant={o.status === 'processing' ? 'accent' : 'success'} size="sm">
                    {o.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Link to={`/pesanan/${o.id}`}>
                    <Button variant="ghost" size="sm" iconOnly={<Eye className="w-3.5 h-3.5 text-gray-600" />} />
                  </Link>
                  <Button variant="outline" size="sm" leftIcon={<Truck className="w-3 h-3" />}>Input Resi</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};
