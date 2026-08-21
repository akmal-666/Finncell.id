import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Save, ArrowLeft, Plus } from 'lucide-react';

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/products');
  };

  return (
    <PageContainer
      title={isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
      subtitle={isEdit ? 'Perbarui informasi dan varian produk.' : 'Tambahkan iPhone atau aksesoris baru ke katalog toko.'}
      breadcrumbs={[
        { label: 'Produk', href: '/admin/products' },
        { label: isEdit ? 'Edit' : 'Baru' },
      ]}
      actions={
        <Link to="/admin/products">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Kembali
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Informasi Dasar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nama Produk *" placeholder="Contoh: iPhone 15 Pro Max" required />
            <Input label="URL Slug *" placeholder="iphone-15-pro-max" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Kategori *"
              options={[
                { value: 'cat-1', label: 'iPhone 15 Series' },
                { value: 'cat-2', label: 'iPhone 14 Series' },
                { value: 'cat-5', label: 'Aksesoris Apple' },
              ]}
            />
            <Input label="Harga Dasar (Rp) *" type="number" placeholder="23999000" required />
            <Input label="Harga Coret (Rp)" type="number" placeholder="24999000" />
          </div>
          <Textarea label="Ringkasan Singkat *" placeholder="Deskripsi ringkas produk untuk kartu katalog..." rows={2} required />
          <Textarea label="Deskripsi Lengkap *" placeholder="Detail keunggulan produk..." rows={4} required />
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" size="md" type="button" onClick={() => navigate('/admin/products')}>Batal</Button>
          <Button variant="primary" size="md" type="submit" leftIcon={<Save className="w-4 h-4" />}>
            Simpan Produk
          </Button>
        </div>
      </form>
    </PageContainer>
  );
};
