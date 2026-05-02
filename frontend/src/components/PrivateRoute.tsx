import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-400 text-sm">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}