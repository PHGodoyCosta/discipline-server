<div align="center">
    <img src="public/images/logo_discipline.png" alt="Logo do Discipline">
</div>

# ✏️ Discipline Server

> Um app web para execução de provas online.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10.0+-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3+-f7a600?style=for-the-badge&logo=typeorm&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00758f?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-UNLICENSED-green?style=for-the-badge)

## 🎥 Funcionamento do projeto

Para entender melhor o funcionamento do projeto com vídeos demonstrativos, imagens, e toda a história de desenvolvimento, acompanhe a matéria completa no meu site portfólio: 

**Link da Matéria Completa:** [https://phgodoycosta.com.br/projeto/discipline](https://phgodoycosta.com.br/projeto/discipline)

## 📦 Instalação

Para o código funcionar corretamente, é necessário iniciar tambem o [**Discipline Server**](https://github.com/PHGodoyCosta/discipline-server) na sua maquina local.

```bash
# Clonar o repositório
git clone https://github.com/PHGodoyCosta/discipline-web
cd discipline-web

# Instalar dependências
npm install
# ou usando pnpm
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Rodando o código!
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ⚙️ Configuração

### Banco de dados

Crie seu banco de dados

```sql
CREATE DATABASE discipline_db;
```

### .env

Configure as seguintes variáveis no arquivo `.env`:

```env
# GENERAL ENV VARIABLES
NODE_ENV=development
PORT=3001

# DATABASE ENV VARIABLES
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=<user>
DATABASE_PASSWORD=<password>
DATABASE_SYNC=true

# DOMAIN SYSTEMS
API_URL=http://localhost:3001
```

### 🏃‍♂️ Testes Unitários

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```