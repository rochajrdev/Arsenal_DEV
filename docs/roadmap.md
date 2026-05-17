# 🗺️ Roadmap e Planejamento de Desenvolvimento

Este documento define a ordem cronológica e lógica para o desenvolvimento do **Arsenal DEV**, seguindo a arquitetura de Monorepo e API-First. O objetivo é garantir entregas contínuas e testáveis sem misturar contextos.

---

## 🎯 Fase 1: Fundação e Infraestrutura (Setup Inicial)
*O objetivo desta fase é criar o "chão de fábrica" para que qualquer desenvolvedor consiga rodar o projeto localmente.*

- [X] **1.1 Inicialização do Monorepo:** Configurar o Turborepo (ou Nx) na raiz do projeto com o `package.json` principal.
- [x] **1.2 Configurações Globais (`packages/config`):** Criar as configurações compartilhadas de TypeScript (`tsconfig.json`), ESLint e Prettier para garantir padronização de código entre Front e Back.
- [X] **1.3 Ambiente Local de Banco de Dados:** Criar o `docker-compose.yml` na raiz para instanciar o PostgreSQL e o Redis.
- [X] **1.4 Biblioteca de Tipos (`packages/types`):** Criar as primeiras interfaces globais TypeScript que serão usadas tanto na API quanto no Web (ex: `ITool`, `IUser`).

---

## ⚙️ Fase 2: Construção da API e Banco de Dados (Backend)
*O foco aqui é garantir que os dados possam ser salvos, listados e protegidos, antes mesmo de existir uma interface gráfica.*

- [X] **2.1 Setup do Projeto API (`apps/api`):** Inicializar o projeto NestJS (ou Express/Go).
- [X] **2.2 Modelagem de Dados (Prisma ORM):** 
    - Criar o `schema.prisma`.
    - Definir os modelos: `User`, `Tool`, `Category`, `Favorite`.
    - Rodar a primeira migração (`prisma migrate dev`).
- [x] **2.3 Módulo de Autenticação:** Implementar autenticação (ex: JWT ou integração com Supabase/Auth.js) para permitir login e proteger rotas.
- [x] **2.4 CRUD de Ferramentas:** Criar os endpoints HTTP para Listar, Buscar (Search), Criar e Detalhar as ferramentas do arsenal.
- [x] **2.5 Módulo de Favoritos:** Criar os endpoints para um usuário favoritar e desfavoritar uma ferramenta.
- [x] **2.6 Seed do Banco de Dados:** Criar um script para popular o banco com algumas ferramentas iniciais reais para testes.

---

## 🎨 Fase 3: Fundação do Frontend (Interface)
*Construção da base visual e componentes reutilizáveis.*

- [ ] **3.1 Setup do Projeto Web (`apps/web`):** Inicializar o projeto React/Next.js.
- [ ] **3.2 Setup de Estilização:** Configurar Tailwind CSS.
- [ ] **3.3 Design System (`packages/ui`):** Instalar o Shadcn/UI (ou similar) e criar os componentes base: Botões, Inputs, Modais, Cards, Headers.
- [ ] **3.4 Estrutura de Roteamento:** Criar as páginas em branco principais: `Home`, `Dashboard/Favoritos`, `Login`.

---

## 🚀 Fase 4: Integração Front e Back (O Sistema Ganhando Vida)
*Conectar as telas construídas na Fase 3 com a API construída na Fase 2.*

- [ ] **4.1 Configuração de API Client:** Configurar o Axios ou Fetch API com interceptadores (para enviar o token de autenticação) e React Query.
- [ ] **4.2 Fluxo de Login:** Integrar a tela de login com o provedor (GitHub) e salvar a sessão do usuário no frontend.
- [ ] **4.3 Catálogo Dinâmico:** Fazer a Home listar as ferramentas consumindo os dados da API.
- [ ] **4.4 Busca e Filtros:** Implementar a barra de pesquisa e filtros por categoria (Frontend -> API).
- [ ] **4.5 Sistema de Favoritos:** Fazer os botões de "Favoritar" nos cards dispararem a requisição para a API e atualizar a UI em tempo real.

---

## 🔮 Fase 5: Polimento e Clientes Alternativos (Futuro)
*O que fará o projeto se destacar como uma ferramenta de excelência para desenvolvedores.*

- [ ] **5.1 Cache com Redis:** Otimizar as buscas na API usando Redis para respostas ultrarrápidas.
- [ ] **5.2 Modo Escuro (Dark Mode):** Refinar o visual do Frontend.
- [ ] **5.3 Criação da CLI (`apps/cli`):** Desenvolver uma interface de linha de comando para buscar ferramentas no terminal (ex: `arsenal search react`).
- [ ] **5.4 Extensão VS Code:** (Ideia bônus) Integrar o Arsenal DEV direto na IDE.
- [ ] **5.5 CI/CD e Deploy:** Configurar GitHub Actions para testes automáticos e subir a Web na Vercel e a API em um servidor cloud.
