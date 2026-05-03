import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { plans, subscriptions } from "@/services/api";

const perks = [
  "1 livro principal selecionado pela curadoria",
  "1 mimo típico do país do mês",
  "1 livrinho de bolso (conto ou poesia)",
  "1 destino surpresa revelado na caixa",
  "Frete grátis para todo o Brasil",
  "Carta do curador com mapa e contexto",
  "Cancele ou pause quando quiser",
];

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    setError("");

    if (!isAuthenticated) {
      navigate("/cadastro");
      return;
    }

    setIsLoading(true);
    try {
      const availablePlans = await plans.list();
      if (!availablePlans || availablePlans.length === 0) {
        setError("Nenhum plano disponível no momento.");
        return;
      }
      const { checkoutUrl } = await subscriptions.create(availablePlans[0].id);
      window.location.href = checkoutUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao iniciar assinatura.";
      // Se já tem assinatura, manda para o dashboard
      if (message.toLowerCase().includes("assinatura")) {
        navigate("/dashboard");
        return;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="assinatura" className="relative overflow-hidden bg-gradient-ink py-24 text-paper md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-gold blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-stamp text-xs uppercase tracking-[0.3em] text-gold">
            · Bilhete de embarque ·
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">
            Uma assinatura,
            <br />
            <span className="italic text-gold-soft">o mundo inteiro.</span>
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="relative overflow-hidden rounded-sm border-2 border-gold/50 bg-paper text-ink shadow-stamp">
            {/* Cabeçalho do bilhete */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-ink/20 bg-paper-deep px-8 py-5">
              <div>
                <div className="font-stamp text-[10px] uppercase tracking-[0.3em] text-gold-deep">
                  Passaporte literário
                </div>
                <div className="font-display text-xl font-medium">Caixa do Mundo · Mensal</div>
              </div>
              <div className="wax-seal flex h-14 w-14 items-center justify-center rounded-full">
                <span className="font-display text-[10px] font-bold italic text-ink">CA</span>
              </div>
            </div>

            {/* Preço */}
            <div className="px-8 pt-10 pb-6 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-stamp text-sm text-muted-foreground">R$</span>
                <span className="font-display text-7xl font-medium leading-none text-ink md:text-8xl">
                  29
                </span>
                <span className="font-display text-4xl text-ink">,90</span>
              </div>
              <div className="mt-2 font-stamp text-xs uppercase tracking-widest text-muted-foreground">
                por mês · frete incluso
              </div>
            </div>

            {/* Perks */}
            <div className="px-8 pb-8">
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={2} />
                    <span className="text-ink/80">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="relative border-t-2 border-dashed border-ink/20 bg-paper-deep px-8 py-6">
              <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-background" />
              <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-background" />
              {error && (
                <p className="mb-3 text-center text-sm text-red-500">{error}</p>
              )}
              <Button
                variant="passport"
                size="xl"
                className="w-full"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? "Aguarde..." : "Carimbar meu passaporte"}
              </Button>
              <p className="mt-3 text-center font-stamp text-[10px] uppercase tracking-widest text-muted-foreground">
                Próxima caixa enviada em até 7 dias
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;