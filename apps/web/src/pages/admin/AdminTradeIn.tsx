import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_TRADEIN } from '@/services/mockData';
import { formatRupiah } from '@/lib/utils';
import { MessageCircle, Check, X } from 'lucide-react';

export const AdminTradeInPage: React.FC = () => {
  return (
    <PageContainer
      title="Pengajuan Trade In"
      subtitle="Kelola permintaan tukar tambah perangkat iPhone dari pelanggan."
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Model Perangkat</TableHead>
              <TableHead>Kapasitas & BH</TableHead>
              <TableHead>Kondisi</TableHead>
              <TableHead>Estimasi Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TRADEIN.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <p className="font-bold text-xs">{t.customerName}</p>
                  <p className="text-[10px] text-gray-400">{t.customerPhone}</p>
                </TableCell>
                <TableCell className="font-bold text-xs">{t.deviceModel}</TableCell>
                <TableCell className="text-xs">{t.storage} • BH {t.batteryHealth}%</TableCell>
                <TableCell className="text-xs text-gray-500 max-w-xs truncate">{t.condition}</TableCell>
                <TableCell className="font-bold text-xs text-[#111111]">{formatRupiah(t.estimatedValue)}</TableCell>
                <TableCell>
                  <Badge variant="accent" size="sm">Menunggu Review</Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <a href={`https://wa.me/${t.customerPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="sm" iconOnly={<MessageCircle className="w-3.5 h-3.5 text-emerald-600" />} />
                  </a>
                  <Button variant="ghost" size="sm" iconOnly={<Check className="w-3.5 h-3.5 text-blue-600" />} />
                  <Button variant="ghost" size="sm" iconOnly={<X className="w-3.5 h-3.5 text-red-500" />} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};
