# 🚀 Arsenal DEV

## 📖 Sobre o Projeto

O **Arsenal DEV** é idealizado para ser um ecossistema completo — um verdadeiro "arsenal" de ferramentas, utilitários e recursos. A ideia central é centralizar soluções inovadoras em uma plataforma robusta, escalável e de fácil acesso. 

Pensado para resolver problemas do dia a dia e otimizar fluxos de trabalho, o projeto vai além de uma simples aplicação. Ele se propõe a ser um conjunto de serviços integrados, entregando valor através de uma interface visual amigável (Web), um motor de regras de negócio poderoso e seguro (API) e ferramentas práticas de terminal (CLI).

## ✨ Objetivos Principais

- **Centralização e Praticidade:** Reunir em um único ecossistema diversas soluções e ferramentas que otimizam tarefas, proporcionando uma experiência unificada.
- **Escalabilidade e Modularidade:** Projetado para crescer continuamente. Novos módulos, serviços e interfaces podem ser adicionados de forma estruturada sem comprometer o núcleo do sistema.
- **Ecossistema Integrado:** Comunicação padronizada e fluida entre todos os canais de acesso do usuário (Front-end e CLI) e a camada de dados (Back-end).

## 🏗 Arquitetura Base

Para suportar essa visão, o projeto utiliza uma fundação moderna que prioriza a organização e a reutilização de recursos:

- **Back-end (`apps/api`):** O motor do ecossistema, construído em **NestJS**. Ele dita as regras de negócio de forma segura e utiliza o **Prisma ORM** para se conectar aos dados.
- **Front-end (`apps/web`):** A face visual do projeto, pensada para entregar uma interface rica e de alta performance utilizando tecnologias modernas do ecossistema React.
- **Ferramentas de Linha de Comando (`apps/cli`):** Um utilitário de terminal projetado para automações, rotinas rápidas e interação direta com a API.
- **Infraestrutura Base:** Sustentado por **PostgreSQL** para o armazenamento relacional de informações e **Redis** para alta performance em filas e cache.

## 🚀 Como Iniciar (Ambiente 100% Dockerizado)

O projeto foi configurado para rodar inteiramente via Docker. Você não precisa ter o Node.js instalado na sua máquina!

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd Arsenal_DEV
   ```

2. Suba o ecossistema completo (Banco, Front-end e Back-end):
   ```bash
   docker-compose up
   ```
   *(Ou `docker compose up` dependendo da versão do seu Docker)*

> [!TIP]
> **O que o Docker está fazendo?**
> Ao rodar esse comando, o Docker levanta o PostgreSQL e o Redis, em seguida sobe um container Node.js (Debian) que mapeia seus arquivos locais. O próprio container instala as dependências (`npm install`), gera o cliente do Prisma e inicia os servidores de desenvolvimento via Turborepo (`npm run dev`). Suas edições no código refletem em tempo real!

---
*💡 A visão do Arsenal DEV é estar em constante evolução, acoplando novas ferramentas e otimizando processos.*
