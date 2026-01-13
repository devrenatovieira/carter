const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const raw = await fs.readFile(path.join(__dirname, '..', 'data', 'seed.json'), 'utf-8');
  const products = JSON.parse(raw);
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
