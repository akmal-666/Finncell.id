import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { MOCK_USERS } from '@/services/mockData';
import { UserPlus, Shield } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  return (
    <PageContainer
      title="Manajemen Pengguna & Hak Akses"
      subtitle="Kelola akun administrator, peran role (Super Admin / Staff), dan lisensi tim."
      actions={
        <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
          Tambah User Admin
        </Button>
      }
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Administrator</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Peran / Role</TableHead>
              <TableHead>Login Terakhir</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-bold text-[#111111]">{u.name}</TableCell>
                <TableCell className="text-xs text-gray-500">{u.email}</TableCell>
                <TableCell>
                  <Badge variant="accent" size="sm" className="inline-flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-gray-500">{u.lastLoginAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};
