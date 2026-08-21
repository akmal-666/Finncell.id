export type TradeInStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'completed';

export interface TradeInSubmission {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceModel: string;
  storage: string;
  condition: string;
  batteryHealth?: number;
  estimatedValue: number;
  status: TradeInStatus;
  notes?: string;
  createdAt: string;
}
