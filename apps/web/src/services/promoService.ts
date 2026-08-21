import { Promo, ApiResponse } from '@fincell/shared';
import { MOCK_PROMOS } from './mockData';

export const promoService = {
  async getPromos(): Promise<ApiResponse<Promo[]>> {
    return {
      success: true,
      data: MOCK_PROMOS
    };
  }
};
