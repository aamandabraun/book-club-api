import { BookOpen, Gift, BookMarked, MapPin } from "lucide-react";
import boxFlatlay from "@/assets/box-flatlay.jpg";

const items = [
  {
    icon: BookOpen,
    title: "1 livro principal",
    desc: "Um romance, ensaio ou clássico de um autor do país do mês — selecionado por nossa curadoria.",
  },
  {
    icon: Gift,
    title: "1 mimo do destino",
    desc: "Um pequeno presente típico: chá, doce, perfume, artesanato. Algo para sentir o lugar.",
  },
  {
    icon: BookMarked,
    title: "1 livrinho de bolso",
    desc: "Conto curto ou poesia de outro escritor da mesma terra. Para ler em uma sentada.",
  },
  {
    icon: MapPin,
    title: "1 destino surpresa",
    desc: "O carimbo só revela o país quando a caixa chega. A descoberta faz parte da viagem.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-background py-24 md:py-32 paper-texture">
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-stamp text-xs uppercase tracking-[0.3em] text-gold-deep">
            · O que vem na caixa ·
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-6xl">
            Quatro tesouros,
            <br />
            <span className="italic">um único país</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Cada caixa é montada à mão, embalada com fita de juta e selada com
            cera dourada. Como uma encomenda de outro século.
          </p>
        </div>

        <div className="mt-20 grid items-center gap-16 lg:grid-cols-2">
          {/* Imagem */}
          <div className="relative">
            <div className="absolute -inset-4 rotate-1 bg-gradient-gold opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-sm border-4 border-paper shadow-stamp">
              <img
                src={boxFlatlay}
                alt="Caixa do Caixa do Mundo com livro, mimo e selo de cera"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Selo de cera sobre a imagem */}
            <div className="wax-seal absolute -bottom-6 -right-6 hidden h-24 w-24 items-center justify-center rounded-full sm:flex">
              <span className="font-display text-xs italic text-ink">desde 2024</span>
            </div>
          </div>

          {/* Lista */}
          <ol className="relative space-y-2">
            {items.map((item, i) => (
              <li
                key={item.title}
                className="group relative flex gap-5 rounded-sm border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-paper"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/30 bg-paper-deep text-ink transition-colors group-hover:border-gold group-hover:bg-gold/10 group-hover:text-gold-deep">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-stamp text-[10px] uppercase tracking-widest text-gold-deep">
                      Item {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
