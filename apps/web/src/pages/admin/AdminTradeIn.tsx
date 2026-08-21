import React, { useEffect, useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { useToast } from '@/components/ui/Toast';
import { tradeInService } from '@/services/tradeInService';
import { formatRupiah } from '@/lib/utils';
import { TradeInSubmission, TradeInStatus } from '@fincell/shared';
import {
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Edit,
  Trash2,
  RotateCcw,
  Phone,
  Tag
} from 'lucide-react';

export const AdminTradeInPage: React.FC = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<TradeInSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');

  // Edit Status Modal
  const [selectedSubmission, setSelectedSubmission] = useState<TradeInSubmission | null>(null);
  const [editStatus, setEditStatus] = useState<TradeInStatus>('new');
  const [editNotes, setEditNotes] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const loadSubmissions = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await tradeInService.getSubmissions();
      if (res.success && res.data) {
        setSubmissions(res.data);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Filter Logic
  const filteredSubmissions = useMemo(() => {
    let list = [...submissions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        t =>
          t.customerName.toLowerCase().includes(q) ||
          t.customerPhone.includes(q) ||
          t.deviceModel.toLowerCase().includes(q)
      );
    }

    if (selectedStatusTab !== 'all') {
      list = list.filter(t => t.status === selectedStatusTab);
    }

    return list;
  }, [submissions, searchQuery, selectedStatusTab]);

  const handleOpenEditModal = (item: TradeInSubmission) => {
    setSelectedSubmission(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedSubmission) return;

    setIsUpdating(true);
    try {
      const res = await tradeInService.updateStatus(selectedSubmission.id, editStatus, editNotes);
      if (res.success) {
        toast('Status Trade In Diperbarui', {
          type: 'success',
          message: `Status pengajuan ${selectedSubmission.customerName} diubah menjadi ${editStatus}.`,
        });
        setSubmissions(prev =>
          prev.map(item => (item.id === selectedSubmission.id ? { ...item, status: editStatus, notes: editNotes } : item))
        );
        setSelectedSubmission(null);
      }
    } catch {
      toast('Gagal Memperbarui', { type: 'error', message: 'Terjadi kesalahan saat menyimpan status.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Hapus pengajuan Trade In dari ${name}?`)) {
      await tradeInService.deleteSubmission(id);
      setSubmissions(prev => prev.filter(item => item.id !== id));
      toast('Berhasil Dihapus', { type: 'info', message: 'Data pengajuan telah dihapus.' });
    }
  };

  // Helper Badge Variant
  const getStatusBadge = (status: TradeInStatus) => {
    switch (status) {
      case 'new':
        return <Badge variant="accent" size="sm">New (Baru)</Badge>;
      case 'contacted':
        return <Badge variant="secondary" size="sm" className="bg-blue-100 text-blue-800">Contacted</Badge>;
      case 'evaluating':
        return <Badge variant="secondary" size="sm" className="bg-purple-100 text-purple-800">Evaluating</Badge>;
      case 'offer_sent':
        return <Badge variant="secondary" size="sm" className="bg-amber-100 text-amber-900 font-bold">Offer Sent</Badge>;
      case 'accepted':
        return <Badge variant="success" size="sm">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="danger" size="sm">Rejected</Badge>;
      case 'completed':
        return <Badge variant="dark" size="sm">Completed</Badge>;
      default:
        return <Badge variant="outline" size="sm">{status}</Badge>;
    }
  };

  return (
    <PageContainer
      title="Pengajuan Trade In (Admin)"
      subtitle="Kelola dan tindak lanjuti permintaan tukar tambah perangkat iPhone dari konsumen."
    >
      <div className="space-y-6">
        
        {/* Controls Toolbar */}
        <Card className="p-5 space-y-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="w-full sm:w-80">
              <Input
                placeholder="Cari pelanggan / WhatsApp / model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Total Pengajuan: <span className="font-extrabold text-[#111111]">{filteredSubmissions.length}</span>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 border-t border-gray-100 pt-3">
            {[
              { id: 'all', label: 'Semua Status' },
              { id: 'new', label: 'New' },
              { id: 'contacted', label: 'Contacted' },
              { id: 'evaluating', label: 'Evaluating' },
              { id: 'offer_sent', label: 'Offer Sent' },
              { id: 'accepted', label: 'Accepted' },
              { id: 'rejected', label: 'Rejected' },
              { id: 'completed', label: 'Completed' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  selectedStatusTab === tab.id
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </Card>
        )}

        {/* Error State */}
        {isError && (
          <ErrorState
            title="Gagal Memuat Pengajuan Trade In"
            message="Terjadi kesalahan saat mengambil daftar pengajuan trade in."
            onRetry={loadSubmissions}
          />
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <Card className="overflow-hidden border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold text-xs">Pelanggan</TableHead>
                  <TableHead className="font-bold text-xs">Model Perangkat</TableHead>
                  <TableHead className="font-bold text-xs">Storage & Warna</TableHead>
                  <TableHead className="font-bold text-xs">Kondisi & BH</TableHead>
                  <TableHead className="font-bold text-xs">Estimasi Harga</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-xs text-gray-500">
                      Tidak ada data pengajuan trade in yang sesuai.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((t) => (
                    <TableRow key={t.id} className="hover:bg-gray-50/80 transition-colors">
                      
                      <TableCell>
                        <p className="font-extrabold text-xs text-[#111111]">{t.customerName}</p>
                        <p className="text-[11px] text-gray-500 font-mono">{t.customerPhone}</p>
                      </TableCell>

                      <TableCell className="font-bold text-xs text-[#111111]">
                        {t.deviceModel}
                      </TableCell>

                      <TableCell className="text-xs">
                        <span className="font-semibold text-gray-700">{t.storage}</span>
                        {t.color && <span className="text-gray-500"> • {t.color}</span>}
                      </TableCell>

                      <TableCell className="text-xs text-gray-600 max-w-xs truncate">
                        <p className="truncate">{t.condition}</p>
                        <p className="text-[10px] text-gray-400">BH: {t.batteryHealth || 90}% • {t.kelengkapan || 'Fullset'}</p>
                      </TableCell>

                      <TableCell className="font-black text-xs text-[#111111]">
                        {formatRupiah(t.estimatedValue)}
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(t.status)}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          
                          {/* Direct WhatsApp Action */}
                          <a
                            href={`https://wa.me/${t.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Halo Kak ${t.customerName}, kami dari fincell.id menindaklanjuti pengajuan Trade In ${t.deviceModel} (${t.storage}). Estimasi penawaran: ${formatRupiah(t.estimatedValue)}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Chat WhatsApp"
                          >
                            <Button variant="ghost" size="sm" iconOnly={<MessageCircle className="w-4 h-4 text-emerald-600" />} />
                          </a>

                          {/* Edit Status Modal Trigger */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEditModal(t)}
                            iconOnly={<Edit className="w-4 h-4 text-blue-600" />}
                            title="Ubah Status"
                          />

                          {/* Delete Action */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(t.id, t.customerName)}
                            iconOnly={<Trash2 className="w-4 h-4 text-rose-600" />}
                            title="Hapus"
                          />

                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      {/* Status Update Modal */}
      {selectedSubmission && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSubmission(null)}
          title={`Ubah Status Trade In: ${selectedSubmission.customerName}`}
        >
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-xs text-gray-500">Perangkat: <span className="font-bold text-[#111111]">{selectedSubmission.deviceModel} ({selectedSubmission.storage})</span></p>
              <p className="text-xs text-gray-500">Estimasi: <span className="font-extrabold text-[#E7B65A]">{formatRupiah(selectedSubmission.estimatedValue)}</span></p>
            </div>

            <Select
              label="Status Baru"
              options={[
                { value: 'new', label: 'New (Pengajuan Baru)' },
                { value: 'contacted', label: 'Contacted (Sudah Di-chat WA)' },
                { value: 'evaluating', label: 'Evaluating (Evaluasi Unit)' },
                { value: 'offer_sent', label: 'Offer Sent (Penawaran Resmi Dikirim)' },
                { value: 'accepted', label: 'Accepted (Diterima Pembeli)' },
                { value: 'rejected', label: 'Rejected (Ditolak / Batal)' },
                { value: 'completed', label: 'Completed (Selesai Tukar Tambah)' },
              ]}
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as TradeInStatus)}
            />

            <Textarea
              label="Catatan Internal Admin"
              placeholder="Tambahkan catatan tindak lanjut..."
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              rows={3}
            />

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(null)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" isLoading={isUpdating} onClick={handleSaveStatus}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </PageContainer>
  );
};
