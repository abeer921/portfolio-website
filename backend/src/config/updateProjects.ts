import { PrismaClient } from '@prisma/client';
import { SAAS_PROJECTS } from './saasProjects';

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.project.deleteMany();
  await prisma.project.createMany({ data: SAAS_PROJECTS });

  console.log(`Removed ${deleted.count} project(s).`);
  console.log(`Added ${SAAS_PROJECTS.length} SaaS projects.`);
}

main()
  .catch((error) => {
    console.error('Failed to update projects:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
