import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptions, Subscription } from "@/services/api";
import stampJapan from "@/assets/stamp-japan.jpg";
import stampColombia from "@/assets/stamp-colombia.jpg";
import stampNigeria from "@/assets/stamp-nigeria.jpg";
import stampIceland from "@/assets/stamp-iceland.jpg";

const receivedBooks = [
  {
    country: "Japão",
    month: "JAN · 2025",
    book: "Kafka à Beira-Mar",
    author: "Haruki Murakami",
    treat: "Chá matcha & papel washi",
    stamp: stampJapan,
    tilt: "stamp-tilt-1",
  },
  {
    country: "Colômbia",
    month: "FEV · 2025",
    book: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    treat: "Café de origem & rede de bolso",
    stamp: stampColombia,
    tilt: "stamp-tilt-2",
  },
  {
    country: "Nigéria",
    month: "MAR · 2025",
    book: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    treat: "Tecido ankara & temperos suya",
    stamp: stampNigeria,
    tilt: "stamp-tilt-3",
  },
  {
    country: "Islândia",
    month: "ABR · 2025",
    book: "Independência",
    author: "Halldór Laxness",
    treat: "Sal de lava & vela aurora",
    stamp: stampIceland,
    tilt: "stamp-tilt-4",
  },
];

function formatPrice(price: number) {
  const value = price > 100 ? price / 100 : price;
  return value.toFixed(2).replace(".", ",");
}

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
      setCancelError(err instanceof Error ? err.message : "Erro ao cancelar assinatura");
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
    pending: "Pendente",
  };

  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <div className="dash-root">
      <div className="dash-bg" />

      {/* Header */}
      <header className="dash-header">
        <button onClick={() => navigate("/")} className="dash-logo">
          <span className="dash-logo-icon">✦</span>
          <span className="dash-logo-text">Caixa do Mundo</span>
        </button>
        <button onClick={handleLogout} className="dash-logout">
          Sair
        </button>
      </header>

      <main className="dash-main">
        {/* Greeting */}
        <div className="dash-greeting">
          <p className="dash-greeting-label">· MEU PASSAPORTE LITERÁRIO ·</p>
          <h1 className="dash-greeting-title">
            Olá, <em>{firstName}</em>
          </h1>
          <p className="dash-greeting-email">{user?.email}</p>
        </div>

        {/* Subscription */}
        <div className="dash-card">
          <div className="dash-card-header">
            <p className="dash-card-label">ASSINATURA</p>
            <h2 className="dash-card-title">Caixa do Mundo · Mensal</h2>
          </div>
          <div className="dash-divider" />
          <div className="dash-card-body">
            {isLoadingSub ? (
              <p className="dash-loading">Carregando...</p>
            ) : subscription ? (
              <div className="dash-sub-row">
                <div className="dash-sub-item">
                  <span className="dash-sub-label">Status</span>
                  <span className={`dash-status-badge dash-status-${subscription.status}`}>
                    {statusLabel[subscription.status] ?? subscription.status}
                  </span>
                </div>
                <div className="dash-sub-item">
                  <span className="dash-sub-label">Plano</span>
                  <span className="dash-sub-value">{subscription.plan.name}</span>
                </div>
                <div className="dash-sub-item">
                  <span className="dash-sub-label">Valor mensal</span>
                  <span className="dash-sub-value">R$ {formatPrice(subscription.plan.price)}</span>
                </div>
                {subscription.currentPeriodEnd && (
                  <div className="dash-sub-item">
                    <span className="dash-sub-label">Próxima renovação</span>
                    <span className="dash-sub-value">
                      {new Date(subscription.currentPeriodEnd).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="dash-no-sub">
                <p className="dash-no-sub-text">Você ainda não tem uma assinatura ativa.</p>
                <button onClick={() => navigate("/#assinatura")} className="dash-action-btn">
                  ASSINAR AGORA
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Next box */}
        <div className="dash-card">
          <div className="dash-card-header">
            <p className="dash-card-label">· PRÓXIMA VIAGEM ·</p>
            <h2 className="dash-card-title">Destino surpresa</h2>
          </div>
          <div className="dash-divider" />
          <div className="dash-card-body">
            <div className="dash-surprise">
              <div className="dash-seal-circle">
                <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>🇫🇷</span>
                <span className="dash-seal-name">FRANCE</span>
              </div>
              <div className="dash-surprise-text">
                <p className="dash-surprise-month">MAI · 2025</p>
                <p className="dash-surprise-title">Você embarcará na França em até 3 dias.</p>
                <p className="dash-surprise-desc"><em>Prepare-se para mais uma viagem sem sair do sofá.</em></p>
                <p className="dash-surprise-note">Frete grátis · Enviada em breve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Received books — same style as Destinations */}
        <div className="dash-section">
          <span className="dash-section-label">· CARIMBOS DO PASSAPORTE ·</span>
          <h2 className="dash-section-title">Países já <em>visitados.</em></h2>

          <div className="dash-books-grid">
            {receivedBooks.map((d, i) => (
              <article
                key={d.country}
                className={`group relative rounded-sm border border-ink/15 bg-paper p-6 shadow-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-stamp ${d.tilt}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Book image — same as Destinations */}
                <div className={`mb-6 flex h-40 items-center justify-center ${d.tilt}`}>
                  <img
                    src={d.stamp}
                    alt={`Capa de ${d.book}`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-36 w-36 object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>

                <div className="dashed-route mb-4 w-full" />

                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-medium text-ink">{d.country}</h3>
                  <span className="font-stamp text-[10px] uppercase tracking-widest text-gold-deep">{d.month}</span>
                </div>

                <p className="mt-3 text-sm font-medium text-ink">{d.book}</p>
                <p className="text-xs italic text-muted-foreground">por {d.author}</p>

                <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-stamp text-[10px] uppercase tracking-widest text-gold-deep">Mimo:</span>{" "}
                  {d.treat}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Cancel — bottom */}
        {subscription?.status === "active" && (
          <div className="dash-cancel-section">
            <div className="dash-divider-light" />
            {cancelError && <p className="dash-cancel-error">{cancelError}</p>}
            {showConfirm ? (
              <div className="dash-confirm-box">
                <p className="dash-confirm-text">Tem certeza? Você perderá o acesso no fim do período atual.</p>
                <div className="dash-confirm-actions">
                  <button onClick={handleCancel} disabled={isCanceling} className="dash-confirm-btn">
                    {isCanceling ? "Cancelando..." : "CONFIRMAR CANCELAMENTO"}
                  </button>
                  <button onClick={() => setShowConfirm(false)} className="dash-back-btn">Voltar</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowConfirm(true)} className="dash-cancel-btn">
                CANCELAR ASSINATURA
              </button>
            )}
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Libre+Baskerville:wght@400;700&display=swap');

        .dash-root {
          min-height: 100vh;
          background-color: #0f1e3a;
          background-image:
            radial-gradient(ellipse at 20% 0%, rgba(26,58,108,0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(16,36,72,0.6) 0%, transparent 50%);
          position: relative;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .dash-bg {
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='0.5'%3E%3Ccircle cx='400' cy='250' r='300'/%3E%3Ccircle cx='400' cy='250' r='200'/%3E%3Ccircle cx='400' cy='250' r='100'/%3E%3Cline x1='0' y1='250' x2='800' y2='250'/%3E%3Cline x1='400' y1='0' x2='400' y2='500'/%3E%3C/g%3E%3C/svg%3E");
          background-size: cover; opacity: 0.5; pointer-events: none; z-index: 0;
        }

        .dash-header {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid rgba(201,151,58,0.2);
          background: rgba(15,30,58,0.8);
          backdrop-filter: blur(8px);
        }

        .dash-logo { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; }
        .dash-logo-icon { font-size: 1rem; color: #c9973a; }
        .dash-logo-text { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 600; color: #f0e6c8; letter-spacing: 0.02em; }

        .dash-logout {
          background: none; border: 1px solid rgba(240,230,200,0.2);
          color: rgba(240,230,200,0.6); font-family: 'Libre Baskerville', serif;
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.4rem 1rem; cursor: pointer; transition: all 0.2s;
        }
        .dash-logout:hover { border-color: rgba(240,230,200,0.5); color: #f0e6c8; }

        .dash-main {
          position: relative; z-index: 1; max-width: 900px; margin: 0 auto;
          padding: 3rem 1.5rem 5rem; display: flex; flex-direction: column; gap: 2rem;
        }

        .dash-greeting { text-align: center; padding-bottom: 1rem; }
        .dash-greeting-label { font-family: 'Libre Baskerville', serif; font-size: 0.65rem; letter-spacing: 0.25em; color: #c9973a; text-transform: uppercase; margin: 0 0 0.75rem 0; }
        .dash-greeting-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 400; color: #f0e6c8; margin: 0 0 0.5rem 0; line-height: 1.2; }
        .dash-greeting-title em { font-style: italic; color: #c9973a; }
        .dash-greeting-email { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: rgba(240,230,200,0.45); margin: 0; }

        .dash-card { background-color: #f5efe0; border-radius: 4px; overflow: hidden; border: 1px solid rgba(201,151,58,0.3); }
        .dash-card-header { background-color: #f0e6c8; padding: 1.25rem 1.75rem 1rem; }
        .dash-card-label { font-family: 'Libre Baskerville', serif; font-size: 0.62rem; letter-spacing: 0.2em; color: #c9973a; margin: 0 0 0.3rem 0; text-transform: uppercase; }
        .dash-card-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 400; color: #0f1e3a; margin: 0; }
        .dash-divider { height: 0; border-top: 1px dashed rgba(15,30,58,0.2); margin: 0 1.75rem; }
        .dash-card-body { padding: 1.5rem 1.75rem; }
        .dash-loading { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: #5a4e3a; font-style: italic; margin: 0; }

        .dash-sub-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; }
        .dash-sub-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .dash-sub-label { font-family: 'Libre Baskerville', serif; font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7a60; }
        .dash-sub-value { font-family: 'Playfair Display', serif; font-size: 1rem; color: #0f1e3a; }

        .dash-status-badge { display: inline-block; font-family: 'Libre Baskerville', serif; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 2px; width: fit-content; }
        .dash-status-active { background: rgba(15,80,30,0.1); color: #1a5c2a; }
        .dash-status-canceled { background: rgba(90,78,58,0.1); color: #5a4e3a; }
        .dash-status-past_due { background: rgba(139,32,32,0.1); color: #8b2020; }
        .dash-status-pending { background: rgba(180,140,20,0.1); color: #8a6a10; }

        .dash-no-sub { display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; }
        .dash-no-sub-text { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: #5a4e3a; font-style: italic; margin: 0; }
        .dash-action-btn { background: #0f1e3a; color: #f0e6c8; border: none; padding: 0.75rem 1.5rem; font-family: 'Libre Baskerville', serif; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .dash-action-btn:hover { background: #1a3260; }

        .dash-surprise { display: flex; align-items: center; gap: 2rem; }

        .dash-seal-circle {
          flex-shrink: 0; width: 90px; height: 90px; border-radius: 50%;
          border: 2px solid rgba(15,30,58,0.25);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.2rem; background: rgba(15,30,58,0.04); position: relative;
        }
        .dash-seal-circle::before { content: ''; position: absolute; inset: 5px; border-radius: 50%; border: 1px solid rgba(15,30,58,0.12); }
        .dash-seal-name { font-family: 'Libre Baskerville', serif; font-size: 0.5rem; letter-spacing: 0.15em; text-transform: uppercase; color: #0f1e3a; }

        .dash-surprise-text { flex: 1; }
        .dash-surprise-month { font-family: 'Libre Baskerville', serif; font-size: 0.65rem; letter-spacing: 0.2em; color: #c9973a; text-transform: uppercase; margin: 0 0 0.4rem 0; }
        .dash-surprise-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #0f1e3a; margin: 0 0 0.35rem 0; line-height: 1.4; }
        .dash-surprise-desc { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: #5a4e3a; margin: 0 0 0.75rem 0; font-style: italic; }
        .dash-surprise-note { font-family: 'Libre Baskerville', serif; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: #8a7a60; margin: 0; }

        /* Books section */
        .dash-section { display: flex; flex-direction: column; gap: 1.25rem; }
        .dash-section-label { font-family: 'Libre Baskerville', serif; font-size: 0.65rem; letter-spacing: 0.2em; color: #c9973a; text-transform: uppercase; margin: 0; display: block; }
        .dash-section-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 400; color: #f0e6c8; margin: 0; }
        .dash-section-title em { font-style: italic; }

        .dash-books-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .dash-books-grid .stamp-tilt-1,
        .dash-books-grid .stamp-tilt-2,
        .dash-books-grid .stamp-tilt-3,
        .dash-books-grid .stamp-tilt-4 {
          transform: none !important;
        }

        /* Cancel */
        .dash-cancel-section { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; padding-top: 1rem; }
        .dash-divider-light { width: 100%; height: 0; border-top: 1px solid rgba(240,230,200,0.1); }

        .dash-cancel-btn { background: transparent; border: 1px solid rgba(139,32,32,0.4); color: rgba(220,180,170,0.7); font-family: 'Libre Baskerville', serif; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.9rem 2.5rem; cursor: pointer; width: 100%; max-width: 360px; transition: all 0.2s; }
        .dash-cancel-btn:hover { border-color: rgba(139,32,32,0.7); color: rgba(220,150,140,0.9); }
        .dash-cancel-error { font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; color: #c07070; font-style: italic; margin: 0; }

        .dash-confirm-box { width: 100%; max-width: 480px; background: rgba(240,230,200,0.06); border: 1px solid rgba(240,230,200,0.1); padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; text-align: center; }
        .dash-confirm-text { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: rgba(240,230,200,0.7); font-style: italic; margin: 0; }
        .dash-confirm-actions { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%; }
        .dash-confirm-btn { background: rgba(139,32,32,0.8); color: #f0e6c8; border: none; padding: 0.9rem 2rem; font-family: 'Libre Baskerville', serif; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; width: 100%; transition: background 0.2s; }
        .dash-confirm-btn:hover { background: rgba(110,20,20,0.9); }
        .dash-confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .dash-back-btn { background: none; border: none; font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; color: rgba(240,230,200,0.4); cursor: pointer; padding: 0; font-style: italic; }
        .dash-back-btn:hover { color: rgba(240,230,200,0.7); }

        @media (max-width: 600px) {
          .dash-main { padding: 2rem 1rem 4rem; }
          .dash-books-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-surprise { flex-direction: column; gap: 1rem; text-align: center; }
          .dash-greeting-title { font-size: 1.75rem; }
          .dash-section-title { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}