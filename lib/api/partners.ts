import { apiClient } from './client'
import type { PartnerPayload, PartnerResponse } from '@/types'

export const partnersApi = {
  submit: (payload: PartnerPayload) =>
    apiClient<PartnerResponse>('/partners', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
