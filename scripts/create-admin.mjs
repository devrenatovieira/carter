import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.log('Uso: node scripts/create-admin.mjs <username> <password>');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 10);

await prisma.adminUser.upsert({
  where: { username },
  update: { passwordHash, isActive: true, role: "admin" },
  create: { username, passwordHash, isActive: true, role: "admin" },
});

console.log("Admin criado/atualizado:", username);
await prisma.$disconnect();
