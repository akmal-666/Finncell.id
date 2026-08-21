import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_BRANDS } from '@/services/mockData';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminBrandsPage: React.FC = () => {
  return (
    <PageContainer
      title="Manajemen Brand"
      subtitle="Kelola daftar merek resmi Apple dan mitra aksesoris."
      actions={
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Tambah Brand
        </Button>
      }
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Brand</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Jumlah Produk</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_BRANDS.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-bold text-[#111111]">{b.name}</TableCell>
                <TableCell className="text-xs text-gray-500 font-mono">/{b.slug}</TableCell>
                <TableCell className="text-xs font-semibold">{b.productCount} Produk</TableCell>
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
