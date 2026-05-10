const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const plan = await prisma.plan.create({
    data: {
      name: 'Caixa do Mundo · Mensal',
      price: 29.90,
      stripePriceId: 'price_1TIqNmAcU8hevhqdmaVCfsTm',
      interval: 'month'
    }
  });
  console.log('Plano criado:', plan);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

const existing = await prisma.plan.findFirst();
if (existing) {
  console.log('Plano já existe, pulando seed.');
  return;
}