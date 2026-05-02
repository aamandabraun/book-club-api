const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getToken(): string | null {
  return localStorage.getItem("token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Erro inesperado" }));
    throw new Error(error.message || "Erro na requisição");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export interface RegisterPayload { name: string; email: string; password: string; }
export interface LoginPayload { email: string; password: string; }
export interface AuthResponse { token: string; user: { id: string; name: string; email: string; }; }
export interface User { id: string; name: string; email: string; }
export interface Plan { id: string; name: string; price: number; stripePriceId: string; }
export interface Subscription { id: string; status: string; currentPeriodEnd: string; plan: Plan; stripeSubscriptionId: string; }
export interface CreateSubscriptionResponse { checkoutUrl: string; }

export const auth = {
  register: (data: RegisterPayload) => request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: LoginPayload) => request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
};

export const users = {
  me: () => request<User>("/users/me"),
};

export const plans = {
  list: () => request<Plan[]>("/plans"),
};

export const subscriptions = {
  create: (planId: string) => request<CreateSubscriptionResponse>("/subscriptions", { method: "POST", body: JSON.stringify({ planId }) }),
  me: () => request<Subscription>("/subscriptions/me"),
  cancel: () => request<void>("/subscriptions/cancel", { method: "DELETE" }),
};