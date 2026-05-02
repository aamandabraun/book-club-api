import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import CadastroPage from "@/pages/CadastroPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/assinatura/sucesso" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}