import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@fincell/shared';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    productService.getProducts({ search }).then((res) => {
      if (res.data) setProducts(res.data);
    });
  }, [search]);

  return (
    <PageContainer
      title="Manajemen Produk"
      subtitle="Kelola katalog produk iPhone, varian harga, spesifikasi, dan ketersediaan stok."
      actions={
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Tambah Produk Baru
          </Button>
        </Link>
      }
    >
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="w-72">
            <Input
              placeholder="Cari nama produk / SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <span className="text-xs text-gray-500 font-medium">{products.length} Produk Terdaftar</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga Dasar</TableHead>
              <TableHead>Kondisi</TableHead>
              <TableHead>Varian SKU</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border" />
                    <div>
                      <p className="font-bold text-[#111111] text-xs">{p.name}</p>
                      <p className="text-[10px] text-gray-400">/{p.slug}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-600">{p.category}</TableCell>
                <TableCell className="font-bold text-xs">{formatRupiah(p.basePrice)}</TableCell>
                <TableCell>
                  <Badge variant={p.condition === 'brand_new' ? 'accent' : 'secondary'} size="sm">
                    {p.condition}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-gray-500">{p.variants.length} Varian</TableCell>
                <TableCell className="text-right space-x-1">
                  <Link to={`/admin/products/${p.id}/edit`}>
                    <Button variant="ghost" size="sm" iconOnly={<Edit className="w-3.5 h-3.5 text-blue-600" />} />
                  </Link>
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
