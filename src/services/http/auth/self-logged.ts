import api from "@/services/http/api";

export function getSelfLogged() {
  const url = `/auth/`;
  return api.get(url);
}
