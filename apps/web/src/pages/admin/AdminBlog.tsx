import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_BLOGS } from '@/services/mockData';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const AdminBlogPage: React.FC = () => {
  return (
    <PageContainer
      title="Manajemen Artikel & Blog"
      subtitle="Publikasikan tips, panduan Apple, dan berita edukasi untuk SEO."
      actions={
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Tulis Artikel Baru
        </Button>
      }
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul Artikel</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_BLOGS.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-bold text-[#111111]">{b.title}</TableCell>
                <TableCell className="text-xs">{b.category}</TableCell>
                <TableCell className="text-xs text-gray-500">{b.author}</TableCell>
                <TableCell>
                  <Badge variant={b.isPublished ? 'success' : 'secondary'} size="sm">
                    {b.isPublished ? 'Terbit' : 'Draft'}
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
