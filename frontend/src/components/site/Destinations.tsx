import stampJapan from "@/assets/stamp-japan.png";
import stampColombia from "@/assets/stamp-colombia.png";
import stampNigeria from "@/assets/stamp-nigeria.png";
import stampIceland from "@/assets/stamp-iceland.png";

const destinations = [
  {
    country: "Japão",
    month: "Jan · 2025",
    book: "Kafka à Beira-Mar",
    author: "Haruki Murakami",
    treat: "Chá matcha & papel washi",
    stamp: stampJapan,
    tilt: "stamp-tilt-1",
  },
  {
    country: "Colômbia",
    month: "Fev · 2025",
    book: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    treat: "Café de origem & rede de bolso",
    stamp: stampColombia,
    tilt: "stamp-tilt-2",
  },
  {
    country: "Nigéria",
    month: "Mar · 2025",
    book: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    treat: "Tecido ankara & temperos suya",
    stamp: stampNigeria,
    tilt: "stamp-tilt-3",
  },
  {
    country: "Islândia",
    month: "Abr · 2025",
    book: "Independência",
    author: "Halldór Laxness",
    treat: "Sal de lava & vela aurora",
    stamp: stampIceland,
    tilt: "stamp-tilt-4",
  },
];

const Destinations = () => {
  return (
    <section id="destinos" className="relative overflow-hidden bg-paper-deep py-24 md:py-32 paper-texture">
      <div className="container relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-stamp text-xs uppercase tracking-[0.3em] text-gold-deep">
              · Carimbos do passaporte ·
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-6xl">
              Países já <span className="italic">visitados</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Cada mês, uma nova fronteira. Veja para onde nossos assinantes já
            viajaram sem sair do sofá.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <article
              key={d.country}
              className="group relative rounded-sm border border-ink/15 bg-paper p-6 shadow-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-stamp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Carimbo */}
              <div className={`mb-6 flex h-40 items-center justify-center ${d.tilt}`}>
                <img
                  src={d.stamp}
                  alt={`Carimbo de ${d.country}`}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-36 w-36 object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>

              <div className="dashed-route mb-4 w-full" />

              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-medium text-ink">
                  {d.country}
                </h3>
                <span className="font-stamp text-[10px] uppercase tracking-widest text-gold-deep">
                  {d.month}
                </span>
              </div>

              <p className="mt-3 text-sm font-medium text-ink">{d.book}</p>
              <p className="text-xs italic text-muted-foreground">por {d.author}</p>

              <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-stamp text-[10px] uppercase tracking-widest text-gold-deep">
                  Mimo:
                </span>{" "}
                {d.treat}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
