import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';

export const AdminActivityLogPage: React.FC = () => {
  const logs = [
    { id: 'l1', user: 'Admin fincell', action: 'Update Harga Produk', target: 'iPhone 15 Pro Max', timestamp: '2024-03-02 14:20:00' },
    { id: 'l2', user: 'Admin fincell', action: 'Input Resi Pengiriman', target: 'FIN-202403-002', timestamp: '2024-03-02 11:00:00' },
  ];

  return (
    <PageContainer
      title="Audit Activity Log"
      subtitle="Catatan riwayat aktivitas perubahan data dan aksi administrator pada sistem."
    >
      <Card className="p-6 space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Administrator</TableHead>
              <TableHead>Jenis Aksi</TableHead>
              <TableHead>Target Data</TableHead>
              <TableHead>Waktu Logs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-bold text-xs">{log.user}</TableCell>
                <TableCell className="text-xs font-semibold">{log.action}</TableCell>
                <TableCell className="text-xs text-gray-600">{log.target}</TableCell>
                <TableCell className="text-xs text-gray-400">{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};
