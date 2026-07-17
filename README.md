<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Sistema de Gerenciamento de Livros e Empréstimos

Este projeto consiste em uma aplicação voltada ao controle de acervo e fluxo de empréstimos, desenvolvida como atividade prática para a disciplina de Desenvolvimento Back-end. O sistema foi projetado de forma modular utilizando o ecossistema NestJS no back-end integrado a uma interface cliente funcional, aplicando conceitos de arquitetura restrita para atender aos requisitos essenciais de uma biblioteca.

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## 📋 Escopo e Arquitetura do Projeto

A aplicação foi estruturada para suportar duas frentes de operação principais, consolidando o aprendizado prático de rotas HTTP, validação de dados de entrada e comunicação cliente-servidor:

1. **Sistema Administrativo (Painel da Biblioteca / RH):** Interface dedicada à gestão do acervo físico. Permite o cadastro de novos títulos, consulta dinâmica através de parâmetros de filtro de busca, exclusão de registros e alteração manual do status de disponibilidade das obras.
2. **Área de Autoatendimento do Leitor:** Portal para uso do cliente final, onde o usuário visualiza seus dados de identificação, consulta o catálogo disponível e realiza o pedido de forma autônoma, atualizando o status do acervo em tempo real no servidor.

---

## 🛠️ Tecnologias Utilizadas

* **Back-end:** NestJS, TypeScript, Node.js
* **Front-end:** HTML5, CSS3, JavaScript Avançado
* **Validação:** `class-validator`, `class-transformer`
* **Containerização:** Docker
* **Deploy:** Render

---

## 👥 Contribuintes e Responsabilidades

A divisão de responsabilidades no desenvolvimento da aplicação foi distribuída de forma colaborativa entre os integrantes do grupo:

### 🚀 Kaio Silva (Líder do Projeto)
* **Arquitetura e Configuração Inicial:** Responsável pela criação da estrutura base do projeto NestJS e gerenciamento de integração de ramos (*merges*) no repositório.
* **Módulo de Usuários:** Estruturação completa da seção de usuários da biblioteca, garantindo identificação, cadastro e geração de usuários genéricos.
* **Gerenciamento do Catálogo de Livros:** Desenvolvimento das regras de negócio essenciais e métodos específicos para manipulação de registros de livros (`POST`, `GET`, `GET :id`, `PATCH`, `DELETE`).

### 🛠️ Melyssa Tainá
* **Fluxo Completo de Empréstimos:** Implementação de ponta a ponta do fluxo de empréstimo e devolução de livros, estruturando e configurando o `Module`, `Controller` e `Service`.
* **Validação de Entrada:** Criação de Data Transfer Objects (DTOs) específicos (`criar-emprestimo.dto.ts`) para garantir a consistência e segurança das propriedades exigidas.
* **Ambiente de Containerização:** Criação e configuração dos arquivos Docker para permitir a execução e testes isolados do ambiente.

### 🎨 Natan
* **Desenvolvimento da Interface Gráfica (Front-end):** Construção integral da pasta de interface, criando a estrutura em HTML (`index.html`), a estilização visual moderna (`style.css`) e o comportamento dinâmico do cliente (`script.js`).
* **Módulo de Filtragem e Edição Visual:** Criação da área de filtros para refinamento de buscas e desenvolvimento do modal de edição de livros isolado do formulário principal.
* **Ajustes e Integração:** Correção de bugs de comunicação para integrar perfeitamente a interface cliente às rotas de API do back-end.

### 🌐 Antony Thiago
* **Preparação para Produção e Deploy:** Configuração do CORS para integração segura, criação da rota de verificação de saúde (`health check`) e atualização das URLs do cliente para comunicação direta com a API implantada na Render.
* **Validação de Dados e Segurança:** Gerenciamento de dependências e ajustes em propriedades críticas dos DTOs (como validação de ano de publicação), garantindo tipagem e transformações seguras.

---

## 💻 Instalação e Execução

### Configuração do Projeto
```bash
$ npm install
```

### Compilar e Executar a Aplicação
```bash
# Desenvolvimento
$ npm run start

# Modo de Observação (Watch Mode)
$ npm run start:dev

# Produção
$ npm run start:prod
```

### Executar Testes
```bash
# Testes unitários
$ npm run test

# Testes e2e (ponta a ponta)
$ npm run test:e2e

# Cobertura de testes
$ npm run test:cov
```

---

## 🌐 Deploy de Produção

Quando estiver pronto para implantar sua aplicação NestJS em produção, você pode seguir os passos oficiais na [documentação de deploy do NestJS](https://docs.nestjs.com/deployment). 

Se preferir uma plataforma baseada em nuvem integrada ao AWS, conheça o [Mau](https://mau.nestjs.com), a plataforma oficial do NestJS:
```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

---

## 📄 Licença

Este projeto é desenvolvido sob a licença [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
