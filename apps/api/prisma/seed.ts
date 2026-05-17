import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Criar Categorias
  const categoriesData = [
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'Database' },
    { name: 'DevOps' },
    { name: 'IDE & Utilitários' },
  ];

  const categoriesMap: Record<string, any> = {};

  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    categoriesMap[cat.name] = category;
    console.log(`📁 Category resolved: ${category.name}`);
  }

  // 2. Criar Ferramentas Populares
  const toolsData = [
    // Frontend
    {
      name: 'React',
      description: 'Uma biblioteca JavaScript para criar interfaces de usuário baseadas em componentes.',
      url: 'https://react.dev',
      categoryName: 'Frontend',
    },
    {
      name: 'Next.js',
      description: 'Framework React definitivo com suporte a renderização no servidor, roteamento e otimizações automáticas.',
      url: 'https://nextjs.org',
      categoryName: 'Frontend',
    },
    {
      name: 'Tailwind CSS',
      description: 'Framework de estilização utilitário CSS que acelera a prototipação e o design de interfaces elegantes.',
      url: 'https://tailwindcss.com',
      categoryName: 'Frontend',
    },
    // Backend
    {
      name: 'NestJS',
      description: 'Framework Node.js progressivo para a construção de aplicativos eficientes, confiáveis e escaláveis.',
      url: 'https://nestjs.com',
      categoryName: 'Backend',
    },
    {
      name: 'Fastify',
      description: 'Framework web altamente focado no desempenho e com o menor overhead de processamento para Node.js.',
      url: 'https://fastify.io',
      categoryName: 'Backend',
    },
    // Database
    {
      name: 'PostgreSQL',
      description: 'Um banco de dados relacional de código aberto extremamente robusto, estável e com suporte a recursos avançados.',
      url: 'https://postgresql.org',
      categoryName: 'Database',
    },
    {
      name: 'Redis',
      description: 'Banco de dados de estrutura de dados na memória, usado como cache e message broker ultrarrápido.',
      url: 'https://redis.io',
      categoryName: 'Database',
    },
    {
      name: 'Supabase',
      description: 'Alternativa open source ao Firebase baseada no PostgreSQL, com autenticação, banco e realtime integrados.',
      url: 'https://supabase.com',
      categoryName: 'Database',
    },
    // DevOps
    {
      name: 'Docker',
      description: 'Plataforma de containerização que facilita empacotar e rodar qualquer aplicação de forma idêntica em qualquer máquina.',
      url: 'https://docker.com',
      categoryName: 'DevOps',
    },
    {
      name: 'GitHub Actions',
      description: 'Ferramenta potente de integração e entrega contínua (CI/CD) nativa para automatizar workflows direto no GitHub.',
      url: 'https://github.com/features/actions',
      categoryName: 'DevOps',
    },
    // IDE & Utilitários
    {
      name: 'VS Code',
      description: 'O editor de código-fonte leve mais popular e extensível, com ecossistema massivo de plugins.',
      url: 'https://code.visualstudio.com',
      categoryName: 'IDE & Utilitários',
    },
    {
      name: 'Postman',
      description: 'Uma plataforma completa para simplificar cada etapa do ciclo de vida das APIs, facilitando os testes.',
      url: 'https://postman.com',
      categoryName: 'IDE & Utilitários',
    },
  ];

  for (const t of toolsData) {
    const category = categoriesMap[t.categoryName];
    if (!category) continue;

    // Buscar se a ferramenta com o mesmo nome já existe
    const existingTool = await prisma.tool.findFirst({
      where: { name: t.name },
    });

    if (existingTool) {
      await prisma.tool.update({
        where: { id: existingTool.id },
        data: {
          description: t.description,
          url: t.url,
          categoryId: category.id,
        },
      });
      console.log(`🔄 Tool updated: ${t.name}`);
    } else {
      await prisma.tool.create({
        data: {
          name: t.name,
          description: t.description,
          url: t.url,
          categoryId: category.id,
        },
      });
      console.log(`✅ Tool created: ${t.name}`);
    }
  }

  console.log('🌿 Seeding finished successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
