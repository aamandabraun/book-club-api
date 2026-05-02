import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function CadastroPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("A senha deve ter pelo menos 6 caracteres"); return; }
    setIsLoading(true);
    try {
      await register({ name, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-root">
      <div className="auth-bg" />

      <div className="auth-container">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">✦</span>
          <span className="auth-logo-text">Caixa do Mundo</span>
        </Link>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="auth-card-label">PASSAPORTE LITERÁRIO</p>
            <h1 className="auth-card-title">Criar conta</h1>
          </div>

          <div className="auth-divider" />

          <div className="auth-card-body">
            <p className="auth-tagline">Uma viagem por mês, sem sair do sofá.</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label className="auth-label" htmlFor="name">Nome completo</label>
                <input
                  id="name" type="text" required
                  placeholder="Seu nome"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="auth-input" autoComplete="name"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="email">E-mail</label>
                <input
                  id="email" type="email" required
                  placeholder="seu@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="auth-input" autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="password">Senha</label>
                <input
                  id="password" type="password" required minLength={6}
                  placeholder="Mínimo 6 caracteres"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="auth-input" autoComplete="new-password"
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-btn" disabled={isLoading}>
                {isLoading ? (
                  <span className="auth-btn-loading">
                    <span className="auth-spinner" />
                    Criando conta...
                  </span>
                ) : "CARIMBAR MEU PASSAPORTE"}
              </button>
            </form>
          </div>

          <div className="auth-divider" />

          <div className="auth-card-footer">
            <p className="auth-toggle-text">
              Já tem conta?{" "}
              <Link to="/login" className="auth-toggle-link">Entrar</Link>
            </p>
          </div>
        </div>

        <p className="auth-footer-note">
          Próxima caixa enviada em até 7 dias · Frete grátis · Cancele quando quiser
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Libre+Baskerville:wght@400;700&display=swap');

        .auth-root {
          min-height: 100vh;
          background-color: #0f1e3a;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(26,58,108,0.6) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(16,36,72,0.8) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .auth-bg {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='0.5'%3E%3Ccircle cx='400' cy='250' r='200'/%3E%3Ccircle cx='400' cy='250' r='160'/%3E%3Ccircle cx='400' cy='250' r='120'/%3E%3Cline x1='0' y1='250' x2='800' y2='250'/%3E%3Cline x1='400' y1='0' x2='400' y2='500'/%3E%3Cline x1='100' y1='50' x2='700' y2='450'/%3E%3Cline x1='700' y1='50' x2='100' y2='450'/%3E%3C/g%3E%3C/svg%3E");
          background-size: cover;
          background-position: center;
          opacity: 0.6;
          pointer-events: none;
        }

        .auth-container {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 480px;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .auth-logo-icon {
          font-size: 1.25rem;
          color: #c9973a;
        }

        .auth-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #f0e6c8;
        }

        .auth-card {
          width: 100%;
          background-color: #f5efe0;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(201,151,58,0.3);
        }

        .auth-card-header {
          background-color: #f0e6c8;
          padding: 1.5rem 2rem 1.25rem;
        }

        .auth-card-label {
          font-family: 'Libre Baskerville', serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #c9973a;
          margin: 0 0 0.4rem 0;
          text-transform: uppercase;
        }

        .auth-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 400;
          color: #0f1e3a;
          margin: 0;
          line-height: 1.2;
        }

        .auth-divider {
          height: 0;
          border-top: 1px dashed rgba(15,30,58,0.25);
          margin: 0 2rem;
        }

        .auth-card-body {
          padding: 1.5rem 2rem;
        }

        .auth-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #5a4e3a;
          margin: 0 0 1.5rem 0;
          font-style: italic;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .auth-label {
          font-family: 'Libre Baskerville', serif;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: #3a2e1e;
          text-transform: uppercase;
          font-weight: 700;
        }

        .auth-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(15,30,58,0.35);
          padding: 0.5rem 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          color: #0f1e3a;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .auth-input::placeholder {
          color: rgba(15,30,58,0.35);
          font-style: italic;
        }

        .auth-input:focus {
          border-bottom-color: #c9973a;
        }

        .auth-error {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          color: #8b2020;
          margin: 0;
          padding: 0.5rem 0.75rem;
          background: rgba(139,32,32,0.08);
          border-left: 2px solid #8b2020;
          font-style: italic;
        }

        .auth-btn {
          margin-top: 0.5rem;
          background-color: #0f1e3a;
          color: #f0e6c8;
          border: none;
          padding: 1rem 2rem;
          font-family: 'Libre Baskerville', serif;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.2s, opacity 0.2s;
        }

        .auth-btn:hover:not(:disabled) {
          background-color: #1a3260;
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
        }

        .auth-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(240,230,200,0.3);
          border-top-color: #f0e6c8;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-card-footer {
          padding: 1rem 2rem 1.5rem;
          text-align: center;
        }

        .auth-toggle-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #5a4e3a;
          margin: 0;
        }

        .auth-toggle-link {
          color: #c9973a;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .auth-toggle-link:hover {
          color: #a07828;
        }

        .auth-footer-note {
          font-family: 'Libre Baskerville', serif;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: rgba(240,230,200,0.4);
          text-align: center;
          margin: 0;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}