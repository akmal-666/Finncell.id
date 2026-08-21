import { TradeInSubmission, ApiResponse, TradeInStatus } from '@fincell/shared';
import { fetchApi } from './apiClient';
import { MOCK_TRADEIN } from './mockData';

const LOCAL_STORAGE_KEY = 'fincell_tradein_submissions';

const getStoredSubmissions = (): TradeInSubmission[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return MOCK_TRADEIN;
};

const saveStoredSubmissions = (data: TradeInSubmission[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

export const tradeInService = {
  async getSubmissions(): Promise<ApiResponse<TradeInSubmission[]>> {
    try {
      const res = await fetchApi<TradeInSubmission[]>('/trade-in');
      if (res.success && res.data) {
        return res;
      }
    } catch {
      // Fallback
    }

    return {
      success: true,
      data: getStoredSubmissions()
    };
  },

  async submitTradeIn(submission: Partial<TradeInSubmission>): Promise<ApiResponse<TradeInSubmission>> {
    const newSubmission: TradeInSubmission = {
      id: `trd-${Date.now()}`,
      customerName: submission.customerName || '',
      customerPhone: submission.customerPhone || '',
      customerEmail: submission.customerEmail || '',
      deviceModel: submission.deviceModel || '',
      storage: submission.storage || '',
      color: submission.color || 'Natural Titanium',
      condition: submission.condition || '',
      kelengkapan: submission.kelengkapan || 'Fullset Original',
      batteryHealth: submission.batteryHealth || 90,
      estimatedValue: submission.estimatedValue || 8000000,
      status: 'new',
      notes: submission.notes || '',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetchApi<TradeInSubmission>('/trade-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubmission)
      });
      if (res.success && res.data) {
        return res;
      }
    } catch {
      // Fallback local storage
    }

    const current = getStoredSubmissions();
    const updated = [newSubmission, ...current];
    saveStoredSubmissions(updated);

    return {
      success: true,
      message: 'Pengajuan Trade-In berhasil dikirim',
      data: newSubmission
    };
  },

  async updateStatus(id: string, status: TradeInStatus, notes?: string): Promise<ApiResponse<TradeInSubmission>> {
    try {
      const res = await fetchApi<TradeInSubmission>(`/trade-in/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      if (res.success && res.data) return res;
    } catch {}

    const current = getStoredSubmissions();
    const index = current.findIndex(t => t.id === id);
    if (index !== -1) {
      current[index].status = status;
      if (notes !== undefined) current[index].notes = notes;
      saveStoredSubmissions([...current]);
      return { success: true, data: current[index] };
    }

    return { success: false, message: 'Submission not found' } as ApiResponse<TradeInSubmission>;
  },

  async deleteSubmission(id: string): Promise<ApiResponse<void>> {
    try {
      await fetchApi<void>(`/trade-in/${id}`, { method: 'DELETE' });
    } catch {}

    const current = getStoredSubmissions().filter(t => t.id !== id);
    saveStoredSubmissions(current);
    return { success: true, data: undefined };
  }
};
