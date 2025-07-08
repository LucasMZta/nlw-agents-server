# NLW Agents

Este projeto foi desenvolvido durante um evento da Rocketseat.

## Tecnologias e Bibliotecas Utilizadas

- **Node.js** + **TypeScript**
- **Fastify**: Framework web para Node.js
- **Drizzle ORM**: ORM para integração com banco de dados PostgreSQL
- **Zod**: Validação de esquemas e variáveis de ambiente
- **@fastify/cors**: Middleware CORS para Fastify
- **drizzle-kit**: Ferramentas de CLI para Drizzle ORM
- **drizzle-seed**: Seed de dados para Drizzle ORM
- **@biomejs/biome**: Linter e formatter
- **postgres**: Cliente PostgreSQL

## Padrões de Projeto

- **Organização em camadas**: Separação de responsabilidades em `http` (rotas), `db` (conexão, schema, migrations, seeds).
- **Validação de ambiente**: Uso de Zod para garantir variáveis de ambiente válidas.
- **Migrations e Seeds**: Estrutura para versionamento e popularização do banco de dados.

## Setup e Configuração

1. **Clone o repositório e instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env` na raiz do projeto com:
     ```
     PORT=3333
     DATABASE_URL=postgresql://usuario:senha@host:porta/database
     ```

3. **Rode as migrations do banco de dados:**

   - As migrations estão em `src/db/migrations`.
   - Utilize o drizzle-kit ou o comando apropriado para aplicar as migrations.

4. **(Opcional) Popule o banco com dados de seed:**

   ```bash
   npm run db:seed
   ```

5. **Inicie o servidor em modo desenvolvimento:**

   ```bash
   npm run dev
   ```

6. **Acesse a API na porta definida (padrão: 3333).**
