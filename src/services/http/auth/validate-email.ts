import api from "@/services/http/api";

export function validateEmail(token: string) {
  const url = `/auth/activation/${token}`;
  return api.get(url);
}
