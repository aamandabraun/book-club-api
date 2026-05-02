import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptions, Subscription } from "@/services/api";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoadingSub, setIsLoadingSub] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    subscriptions
      .me()
      .then(setSubscription)
      .catch(() => setSubscription(null))
      .finally(() => setIsLoadingSub(false));
  }, []);

  async function handleCancel() {
    setIsCanceling(true);
    setCancelError("");
    try {
      await subscriptions.cancel();
      setSubscription(null);
      setShowConfirm(false);
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "Erro ao cancelar assinatura"
      );
    } finally {
      setIsCanceling(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const statusLabel: Record<string, string> = {
    active: "Ativa",
    canceled: "Cancelada",
    past_due: "Pagamento pendente",
    trialing: "Em teste",
    incomplete: "Incompleta",
  };

  const statusColor: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    canceled: "bg-stone-100 text-stone-500",
    past_due: "bg-red-100 text-red-700",
    trialing: "bg-blue-100 text-blue-700",
    incomplete: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-bold text-stone-800 tracking-tight"
          >
            📦 Caixa do Mundo
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-stone-500 hover:text-stone-800 transition"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            Olá, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-stone-500 text-sm mt-1">{user?.email}</p>
        </div>

        {/* Subscription card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-stone-700 mb-4">
            Minha assinatura
          </h2>

          {isLoadingSub ? (
            <p className="text-stone-400 text-sm">Carregando...</p>
          ) : subscription ? (
            <div className="space-y-4">
              {/* Status badge */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    statusColor[subscription.status] ??
                    "bg-stone-100 text-stone-500"
                  }`}
                >
                  {statusLabel[subscription.status] ?? subscription.status}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-400">Plano</p>
                  <p className="font-medium text-stone-800">
                    {subscription.plan.name}
                  </p>
                </div>
                <div>
                  <p className="text-stone-400">Valor mensal</p>
                  <p className="font-medium text-stone-800">
                    R${" "}
                    {(subscription.plan.price / 100).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div>
                  <p className="text-stone-400">Próxima renovação</p>
                  <p className="font-medium text-stone-800">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>

              {/* Cancel */}
              {subscription.status === "active" && (
                <div className="pt-4 border-t border-stone-100">
                  {cancelError && (
                    <p className="text-red-600 text-sm mb-2">{cancelError}</p>
                  )}

                  {showConfirm ? (
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-stone-600">
                        Tem certeza? Você perderá o acesso no fim do período.
                      </p>
                      <button
                        onClick={handleCancel}
                        disabled={isCanceling}
                        className="px-4 py-1.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition"
                      >
                        {isCanceling ? "Cancelando..." : "Confirmar"}
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="text-sm text-stone-400 hover:text-stone-600"
                      >
                        Voltar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="text-sm text-red-500 hover:text-red-700 transition"
                    >
                      Cancelar assinatura
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-stone-500 text-sm">
                Você ainda não tem uma assinatura ativa.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition"
              >
                Ver planos
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}