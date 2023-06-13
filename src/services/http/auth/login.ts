import api from "@/services/http/api";

export interface Credentials {
  email: string;
  password: string;
}
export interface SessionData {
  auth: {
    token: string;
    user: {
      profile: string;
      name: string;
      email: string;
    };
    first_access: string;
  };
}
export interface UserData {
  profile: string;
  name: string;
  email: string;
}

export function login(credentials: Credentials) {
  return api.post("/auth/login", credentials);
}
