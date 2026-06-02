import { apiClient } from './client'
import type { RegisteredUsersResponse, PartnerRequestsResponse } from '@/types'

export const adminApi = {
  getRegisteredUsers: () =>
    apiClient<RegisteredUsersResponse>('/admin/users'),

  getPartnerRequests: () =>
    apiClient<PartnerRequestsResponse>('/admin/partners'),
}
