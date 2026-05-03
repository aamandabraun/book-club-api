import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container flex items-center justify-between py-6">
        <a href="#" className="flex items-center gap-2 text-paper">
          <Compass className="h-6 w-6 text-gold" strokeWidth={1.5} />
          <span className="font-display text-2xl font-semibold tracking-wide">Caixa do Mundo</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Como funciona", href: "#como-funciona" },
            { label: "Destinos", href: "#destinos" },
            { label: "Assinatura", href: "#assinatura" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-stamp text-xs uppercase tracking-widest text-paper/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          variant="seal"
          size="sm"
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
        >
          {isAuthenticated ? "Login" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Header;