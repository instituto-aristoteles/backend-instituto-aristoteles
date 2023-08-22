import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash('', 10);
  const admin = await prisma.user.upsert({
    where: {
      email: null,
    },
    update: {},
    create: {
      name: 'Instituto Aristóteles - Admin',
      email: '',
      password: hash,
    },
  });

  console.log({ admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
