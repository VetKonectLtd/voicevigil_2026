import { useMutation } from "@tanstack/react-query";
import { partnersApi } from "@/lib/api/partners";
import type { PartnerPayload } from "@/types";
import { publicApi } from "../api/client";

export const useSubmitPartnerForm = () =>
  useMutation({
    mutationFn: (payload: PartnerPayload) => partnersApi.submit(payload),
  });

export const useSubmitPartnership = () => {
  return useMutation({
    mutationFn: publicApi.submitPartnership,
  });
};
