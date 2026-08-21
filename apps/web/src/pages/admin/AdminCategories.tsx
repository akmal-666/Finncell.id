import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_CATEGORIES } from '@/services/mockData';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  return (
    <PageContainer
      title="Kategori Produk"
      subtitle="Kelola hierarki kategori produk iPhone dan aksesoris."
      actions={
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Tambah Kategori
        </Button>
      }
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kategori</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Jumlah Produk</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CATEGORIES.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-bold text-[#111111]">{cat.name}</TableCell>
                <TableCell className="text-xs text-gray-500 font-mono">/{cat.slug}</TableCell>
                <TableCell className="text-xs font-semibold">{cat.productCount} Produk</TableCell>
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
