import { useMutation } from '@tanstack/react-query'
import { partnersApi } from '@/lib/api/partners'
import type { PartnerPayload } from '@/types'

export const useSubmitPartnerForm = () =>
  useMutation({
    mutationFn: (payload: PartnerPayload) => partnersApi.submit(payload),
  })
