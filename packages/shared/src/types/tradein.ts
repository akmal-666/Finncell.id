export type TradeInStatus =
  | 'new'
  | 'contacted'
  | 'evaluating'
  | 'offer_sent'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'pending'
  | 'reviewed';

export interface TradeInSubmission {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deviceModel: string;
  storage: string;
  color?: string;
  condition: string;
  kelengkapan?: string;
  batteryHealth?: number;
  estimatedValue: number;
  status: TradeInStatus;
  notes?: string;
  createdAt: string;
}
