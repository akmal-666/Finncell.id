import { Order, ApiResponse } from '@fincell/shared';
import { MOCK_ORDERS } from './mockData';

export const orderService = {
  async getOrders(): Promise<ApiResponse<Order[]>> {
    return {
      success: true,
      data: MOCK_ORDERS,
      meta: { total: MOCK_ORDERS.length, page: 1, limit: 10 }
    };
  },

  async getOrderById(id: string): Promise<ApiResponse<Order | null>> {
    const order = MOCK_ORDERS.find(o => o.id === id || o.orderNumber === id) || MOCK_ORDERS[0];
    return {
      success: true,
      data: order
    };
  }
};
