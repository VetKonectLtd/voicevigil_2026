import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/lib/api/admin'

export const useGetRegisteredUsers = () =>
  useQuery({
    queryKey: ['registeredUsers'],
    queryFn: () => adminApi.getRegisteredUsers(),
  })

export const useGetPartnerRequests = () =>
  useQuery({
    queryKey: ['partnerRequests'],
    queryFn: () => adminApi.getPartnerRequests(),
  })
