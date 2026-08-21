import { TradeInSubmission, ApiResponse } from '@fincell/shared';
import { MOCK_TRADEIN } from './mockData';

export const tradeInService = {
  async getSubmissions(): Promise<ApiResponse<TradeInSubmission[]>> {
    return {
      success: true,
      data: MOCK_TRADEIN
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
      condition: submission.condition || '',
      batteryHealth: submission.batteryHealth || 90,
      estimatedValue: submission.estimatedValue || 8000000,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Pengajuan Trade-In berhasil dikirim',
      data: newSubmission
    };
  }
};
