import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_PROMOS } from '@/services/mockData';
import { formatRupiah } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminPromosPage: React.FC = () => {
  return (
    <PageContainer
      title="Manajemen Promo & Voucher"
      subtitle="Buat dan kelola kode diskon, kupon launching, dan penawaran khusus."
      actions={
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Buat Promo Baru
        </Button>
      }
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode Promo</TableHead>
              <TableHead>Judul Penawaran</TableHead>
              <TableHead>Nilai Diskon</TableHead>
              <TableHead>Penggunaan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PROMOS.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono font-bold text-[#111111]">{p.code}</TableCell>
                <TableCell className="font-semibold text-xs">{p.title}</TableCell>
                <TableCell className="font-bold text-xs">{formatRupiah(p.discountValue)}</TableCell>
                <TableCell className="text-xs text-gray-500">{p.usageCount} kali dipakai</TableCell>
                <TableCell>
                  <Badge variant={p.isActive ? 'success' : 'secondary'} size="sm">
                    {p.isActive ? 'Aktif' : 'Non-aktif'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" iconOnly={<Edit className="w-3.5 h-3.5 text-blue-600" />} />
                  <Button variant="ghost" size="sm" iconOnly={<Trash2 className="w-3.5 h-3.5 text-red-500" />} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};
