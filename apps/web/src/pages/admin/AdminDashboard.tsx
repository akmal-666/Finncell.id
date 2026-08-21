import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { formatRupiah } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, RefreshCw, ArrowUpRight, Plus, Eye } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <PageContainer
      title="Dashboard Overview"
      subtitle="Ringkasan kinerja toko online, statistik penjualan, dan aktivitas terbaru."
      actions={
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Tambah Produk
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-5 flex items-center gap-4 bg-white border border-gray-200">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Omset Bulan Ini</p>
              <p className="text-xl font-black text-[#111111] mt-0.5">{formatRupiah(142500000)}</p>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +14.2% dari bulan lalu
              </span>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 bg-white border border-gray-200">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Pesanan Aktif</p>
              <p className="text-xl font-black text-[#111111] mt-0.5">18 Pesanan</p>
              <span className="text-[10px] text-gray-400 mt-1 block">5 perlu dikirim</span>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 bg-white border border-gray-200">
            <div className="p-3 rounded-2xl bg-amber-50 text-[#B88632]">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Produk Catalog</p>
              <p className="text-xl font-black text-[#111111] mt-0.5">30 SKU</p>
              <span className="text-[10px] text-amber-600 font-bold mt-1 block">2 stok menipis</span>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4 bg-white border border-gray-200">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Pengajuan Trade In</p>
              <p className="text-xl font-black text-[#111111] mt-0.5">6 Permintaan</p>
              <span className="text-[10px] text-purple-600 font-bold mt-1 block">Menunggu review</span>
            </div>
          </Card>
        </div>

        {/* Recent Orders Table */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111]">Pesanan Terbaru</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-[#B88632] hover:underline">
              Lihat Semua Pesanan
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Pesanan</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono font-bold text-[#111111]">FIN-202403-001</TableCell>
                <TableCell>Ahmad Rizky</TableCell>
                <TableCell className="font-bold">{formatRupiah(23549000)}</TableCell>
                <TableCell><Badge variant="success" size="sm">Diproses</Badge></TableCell>
                <TableCell className="text-gray-500">01 Mar 2024</TableCell>
                <TableCell className="text-right">
                  <Link to="/pesanan/ord-1001">
                    <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>Detail</Button>
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono font-bold text-[#111111]">FIN-202403-002</TableCell>
                <TableCell>Budi Santoso</TableCell>
                <TableCell className="font-bold">{formatRupiah(918000)}</TableCell>
                <TableCell><Badge variant="accent" size="sm">Dikirim</Badge></TableCell>
                <TableCell className="text-gray-500">02 Mar 2024</TableCell>
                <TableCell className="text-right">
                  <Link to="/pesanan/ord-1002">
                    <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>Detail</Button>
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

      </div>
    </PageContainer>
  );
};
