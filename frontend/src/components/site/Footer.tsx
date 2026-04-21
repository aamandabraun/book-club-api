import { Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <span className="font-display text-2xl font-semibold">Caixa do Mundo</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              O mundo cabe numa caixa. Literatura e cultura entregues na sua
              porta, todo mês, de um país diferente.
            </p>
          </div>

          <div>
            <h4 className="font-stamp text-xs uppercase tracking-[0.3em] text-gold">
              Navegar
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-paper/70">
              <li><a href="#como-funciona" className="hover:text-gold">Como funciona</a></li>
              <li><a href="#destinos" className="hover:text-gold">Destinos</a></li>
              <li><a href="#assinatura" className="hover:text-gold">Assinatura</a></li>
              <li><a href="#faq" className="hover:text-gold">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-stamp text-xs uppercase tracking-[0.3em] text-gold">
              Contato
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-paper/70">
              <li>ola@caixadomundo.com.br</li>
              <li>Santa Catarina · Brasil</li>
              <li>Atendimento: seg-sex, 9h-18h</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6 font-stamp text-[10px] uppercase tracking-[0.3em] text-paper/40">
          <span>© 2026 Todos os carimbos reservados</span>
          <span>Feito à mão em SC</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
