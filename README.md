# ❓ LetMeAsk API – Geração de resposta

> Sistema de perguntas e respostas baseado em IA que utiliza RAG (Retrieval Augmented Generation) para responder questões com base no conteúdo de áudios de salas.

A API processa áudios enviados por usuários, transcreve o conteúdo via IA, gera embeddings semânticos e utiliza busca vetorial para recuperar contexto relevante antes de gerar respostas inteligentes.

![Status](https://img.shields.io/badge/status-estável-2ECC71?style=flat-square)

---

## 🎯 Problema que este sistema resolve

Em ambientes de aulas, reuniões ou sessões gravadas, grande parte do conhecimento fica “preso” no áudio.

Este sistema resolve isso permitindo que:

- Áudios sejam armazenados e processados automaticamente
- O conteúdo seja transformado em conhecimento pesquisável
- Usuários façam perguntas em linguagem natural
- O sistema responda com base no conteúdo real das gravações

---

## ⚙️ Como funciona (RAG Pipeline)

O sistema segue um fluxo de recuperação e geração baseado em embeddings:

![RAG Pipeline](https://raw.githubusercontent.com/oliveiradniel/letmeask.server/refs/heads/main/docs/images/rag-pipeline-flow.png)

### 🧠 Busca semântica

A recuperação de contexto é feita por similaridade de cosseno entre embeddings vetoriais.

- 1.0 → semântica idêntica
- 0.0 → sem relação
- -1.0 → opostos

O sistema utiliza um threshold mínimo de 0.45, garantindo que apenas trechos com relevância semântica real sejam usados como contexto.

---

## 🧩 Modelagem de dados

O sistema é estruturado em torno de três conceitos principais:

- Salas (Rooms) → agrupam contexto de uma sessão
- Perguntas (Questions) → consultas feitas pelos usuários
- Áudios (Audio chunks) → unidade central de conhecimento

Relacionamentos:

- Room → 1:N → Questions
- Room → 1:N → Audio chunks

Os audio chunks armazenam:

- transcrição
- embedding vetorial
- metadados de contexto

👉 Essa estrutura permite recuperação granular e precisa de informação.

---

## 🧱 Arquitetura do sistema

![System Architeture](https://raw.githubusercontent.com/oliveiradniel/letmeask.server/refs/heads/main/docs/images/system-architeture.png)

---

## 🚀 Stacks principais (Produção)

| Tecnologia        | Papel no Sistema                                |
| ----------------- | ----------------------------------------------- |
| NestJS            | Estrutura modular da API e orquestração.        |
| Prisma            | ORM e gerenciamento de dados.                   |
| PostgreSQL        | Persistência e armazenamento vetorial.          |
| Google Gemini     | Transcrição, embeddings e geração de respostas. |
| pg                | Driver de conexão com PostgreSQL.               |
| class-validator   | Validação de dados de entrada.                  |
| class-transformer | Serialização e transformação de DTOs.           |
| reflect-metadata  | Suporte a decorators no runtime.                |

---

## 🧪 Stacks de Desenvolvimento

| Tecnologia | Uso                                 |
| ---------- | ----------------------------------- |
| TypeScript | Tipagem e segurança de código.      |
| ESLint     | Padronização e qualidade de código. |
| Prettier   | Formatação automática.              |
| Husky      | Git hooks (qualidade de commits).   |
| Commitlint | Padronização de commits.            |
| Faker      | Geração de dados de teste.          |
| Prisma CLI | Migrações e schema.                 |

---

## 📄 Variáveis de Ambiente (Docker Compose)

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome                | Descrição           | Exemplo                                                   |
| ------------------- | ------------------- | --------------------------------------------------------- |
| `POSTGRES_USER`     | Usuário do banco    | `postgres`                                                |
| `POSTGRES_PASSWORD` | Senha do banco      | `postgres`                                                |
| `POSTGRES_DB`       | Nome do banco       | `agents-db`                                               |
| `DATABASE_URL`      | String de conexão   | `postgresql://postgres:postgres@localhost:5432/agents-db` |
| `FRONT_END_ORIGIN`  | CORS do frontend    | `http://localhost:5173`                                   |
| `GEMINI_API_KEY`    | Chave da API Gemini | `AIg3fgkseg_Qs-QzkOm6TDYUXZ8A8RjAYwbKDQPD09Kok`           |

---

## ▶️ Instruções para rodar o projeto

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/letmeask.server.git
cd letmeask.server
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o ambiente:

```bash
# Linux/macOS

cp .env.example .env

# Se estiver no Windows (PowerShell)

copy .env.example .env
```

4. Suba os serviços:

```bash
docker compose up -d
```

5. Execute a API:

```bash
npm run start:dev
```

6. Preencha as tabelas (Opcional):

```bash
npx prisma db seed
```

---

## 💻 Como utilizar o sistema na web

Para conseguir utilizar a aplicação vá até o [repositório web](https://github.com/oliveiradniel/letmeask.web) e siga os passos corretamente para colocá-la no ar e fazer uso.

## 🧑🏻‍💻 Veja outros projetos meus

### Produção

- [JungleOps](https://jungleops.com.br/cadastro?redirect=%2Ftarefas) - gestão de tarefas em equipe em tempo real.
- [InOrbit](https://app.inorbit.site/login) - Gestão de metas semanais com gamificação.

### Repositório

- [ForgePlan API](https://github.com/oliveiradniel/forgeplan-server) - Sistema industrial de planejamento e estoque.
