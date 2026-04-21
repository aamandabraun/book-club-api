import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Como o país do mês é escolhido?",
    a: "Nossa curadoria traça uma rota anual passando por todos os continentes, equilibrando clássicos consagrados e literaturas pouco exploradas no Brasil. Cada destino é mantido em segredo até a chegada da caixa.",
  },
  {
    q: "E se eu já tiver lido o livro do mês?",
    a: "Sem problemas. Avise nosso atendimento em até 3 dias após o anúncio do destino e enviamos um título alternativo do mesmo país, sem custo adicional.",
  },
  {
    q: "Posso pausar ou cancelar?",
    a: "Sim, a qualquer momento. Você gerencia sua assinatura pelo painel do assinante, com opção de pausar por 1 a 3 meses ou cancelar com um clique.",
  },
  {
    q: "Quanto tempo leva para chegar?",
    a: "As caixas são despachadas até o dia 10 de cada mês. O prazo de entrega varia de 3 a 10 dias úteis conforme a região do Brasil.",
  },
  {
    q: "O que vem dentro exatamente?",
    a: "Um livro principal, um mimo típico do país (chá, doce, artesanato), um livrinho de bolso com conto ou poesia, uma carta do curador e o carimbo do destino — tudo embalado à mão.",
  },
  {
    q: "Os livros são novos?",
    a: "Sempre. Trabalhamos com editoras parceiras para enviar exemplares novos, em capa dura sempre que possível, em edições caprichadas.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="relative bg-background py-24 md:py-32 paper-texture">
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-stamp text-xs uppercase tracking-[0.3em] text-gold-deep">
            · Perguntas frequentes ·
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-6xl">
            Antes de <span className="italic">embarcar</span>.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mx-auto mt-12 max-w-2xl">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-ink/15"
            >
              <AccordionTrigger className="py-6 text-left font-display text-xl font-medium text-ink hover:text-gold-deep hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
