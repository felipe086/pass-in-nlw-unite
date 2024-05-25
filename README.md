<h1 align="center">pass.in</h1>

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

Desenvolvido no evento "NLW Unite" promovido pela [Rocketseat](www.rocketseat.com.br) durantes os dias 01 a 05/04 de 2024.

## Requisitos

- [NodeJs](https://nodejs.org)

## Configuração

- Clone o repositório.
- Instale as dependências (`npm install`).
- Configure o PostgreSQL e o Redis (`docker compose up -d`).
- Copie o arquivo `.env.example` (`cp .env.example .env`).
- Execute a aplicação (`npm run dev`).
