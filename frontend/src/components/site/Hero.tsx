import { Button } from "@/components/ui/button";
import heroMap from "@/assets/hero-map.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-ink text-paper">
      {/* Mapa de fundo */}
      <div className="absolute inset-0">
        <img
          src={heroMap}
          alt="Mapa-múndi vintage com rotas de viagem"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-vignette" />
      </div>

      {/* Conteúdo */}
      <div className="container relative z-10 flex min-h-screen flex-col justify-center pt-32 pb-20">
        <div className="w-full animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
          </div>

          <h1 className="font-display text-5xl font-medium leading-[1.05] text-paper md:text-7xl lg:text-8xl">
            Uma viagem
            <br />
            por mês:
            <br />
            <span className="italic text-gold-soft">sem pagar passagem</span>
          </h1>

          <div className="mt-8 relative">
            <p className="max-w-lg text-lg leading-relaxed text-paper/80 md:text-xl">
              Todo mês, um destino diferente chega na sua porta. Literatura,
              cultura e pequenos tesouros do mundo inteiro — sem precisar fazer
              as malas.
            </p>

            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <Button variant="seal" size="xl" asChild className="w-full md:w-auto">
                <a href="#assinatura">Carimbar passaporte</a>
              </Button>
              <Button variant="passport" size="xl" asChild className="w-full md:w-auto">
                <a href="#como-funciona">Ver como funciona</a>
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-paper/60">
            <div>
              <div className="font-display text-3xl text-gold">R$ 29,90</div>
              <div className="font-stamp text-xs uppercase tracking-widest">por mês</div>
            </div>
            <div className="h-10 w-px bg-paper/20" />
            <div className="text-xs leading-relaxed">
              Frete incluso · Cancele quando quiser
              <br />
              Próxima rota: <span className="text-gold-soft">surpresa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Linha inferior decorativa */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-3 px-8 py-4 text-paper/40">
        <span className="font-stamp text-[10px] uppercase tracking-[0.4em]">N 23.5° W 46.6°</span>
        <div className="h-px flex-1 bg-paper/20" />
        <span className="font-stamp text-[10px] uppercase tracking-[0.4em]">Rota aberta</span>
      </div>
    </section>
  );
};

export default Hero;
