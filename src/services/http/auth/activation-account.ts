import api from "@/services/http/api";

export interface ActivationAccountData {
  password: string;
  confirm_password: string;
}

export function activationAccount(data: ActivationAccountData, token: string) {
  const url = `/auth/activation/${token}`;
  return api.put(url, data);
}
