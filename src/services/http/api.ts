import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8'",
  },
});

export function getTokenFromStorage(): string {
  try {
    const { session } = JSON.parse(localStorage.getItem("session") || "{}");

    if (!session.auth.token) {
      throw new Error("Token is missing");
    }

    return `${session.auth.token}`;
  } catch (e) {
    return "Token is missing";
  }
}

api.interceptors.request.use(
  (request) => {
    request.headers.set("Authorization", getTokenFromStorage());
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
