import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const username = "renato.vieira";
const password = "Carter@123"; 

async function main() {
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: {
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      username,
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Admin pronto:", admin.username);
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
