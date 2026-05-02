import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { auth, users, User, LoginPayload, RegisterPayload } from "@/services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) { setIsLoading(false); return; }
    users.me().then(setUser).catch(() => { localStorage.removeItem("token"); setToken(null); }).finally(() => setIsLoading(false));
  }, [token]);

  const login = useCallback(async (data: LoginPayload) => {
    const res = await auth.login(data);
    localStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    const res = await auth.register(data);
    localStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}