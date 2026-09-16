# Focus Room App

Aplicação de produtividade em tempo real para criar salas de foco compartilhadas, com timer Pomodoro e sincronização de status entre participantes.

## Visão geral

O projeto tem como objetivo permitir que pessoas trabalhem ou estudem em grupo em uma mesma "sala de foco", com regras simples de acesso e atualização em tempo real:

- criar uma sala de estudo/trabalho;
- entrar em uma sala usando um código compartilhado;
- sincronizar status dos participantes;
- controlar um timer Pomodoro que pode ser iniciado, pausado e reiniciado;
- navegar por rotas protegidas para manter o contexto da sala.

A aplicação foi construída com uma arquitetura em duas partes:

- Front-end: interface web em React + Vite + TypeScript
- Back-end: API e eventos em tempo real com Express + Socket.IO

---

## Funcionalidades

### Sala compartilhada

- criação de sala com título e duração padrão;
- entrada por código da sala;
- validação de sala inexistente ou código inválido;
- atualização em tempo real da lista de membros;
- controle de status do usuário: online, focused e paused.

### Pomodoro

- modos de foco, pausa curta e pausa longa;
- contador regressivo em segundos;
- iniciar/pausar reinício do timer;
- sincronização de status do usuário conforme o timer é usado.

### Fluxo de convite

- rotas de convite com código embutido;
- troca entre telas de criação e entrada de sala;
- persistência local de usuário e código da sala para manter a navegação.

---

## Tecnologias

### Front-end

- React 19
- Vite
- TypeScript
- React Router
- Socket.IO Client
- Tailwind CSS

### Back-end

- Node.js
- Express 5
- Socket.IO
- TypeScript
- tsx
- tsup

---

## Estrutura do projeto

```text
focus-room-app/
├── back-end/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── core/
│   │   │   ├── env/
│   │   │   ├── http/
│   │   │   └── web-socket/
│   │   └── modules/
│   │       └── room/
│   │           ├── handlers/
│   │           ├── services/
│   │           └── types/
│   ├── package.json
│   └── tsconfig.json
├── front-end/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
└── README.md
```

### Observações importantes

- O back-end guarda as salas em memória com `Map<string, Room>`.
- Isso significa que as salas não persistem após reinicialização do servidor.
- Os códigos das salas são validado no backend como sequência numérica de 4 dígitos.

---

## Fluxo principal da aplicação

1. Usuário acessa a home da aplicação.
2. Decide criar uma sala ou entrar em uma existente.
3. O front-end envia eventos ao back-end via Socket.IO.
4. O servidor valida, cria ou atualiza a sala na memória.
5. A sala é compartilhada entre os participantes por meio de `room_state_update`.
6. O timer e o status de cada participante são atualizados em tempo real.

---

## Observações de arquitetura

- O back-end usa eventos de WebSocket para reduzir o acoplamento da interface com a lógica de sala.
- O front-end centraliza o contexto da sala para manter um único estado compartilhado entre componentes.
- O roteamento da aplicação separa a área principal da área da sala.
- O layout de proteção bloqueia o acesso à sala sem um usuário válido em `localStorage`.

---

## Contribuição

O projeto pode ser expandido com melhorias como:

- persistência de salas em banco de dados;
- autenticação de usuários;
- chat da sala;
- histórico de sessões de foco;
- compartilhamento de convite mais amigável;
- notificações de eventos e status.

---

## Licença

Este projeto está em desenvolvimento e não define uma licença específica no código atual.
