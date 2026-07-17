<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```
Contribuintes e Responsabilidades
Abaixo estão listados os integrantes do projeto e o detalhamento das frentes de desenvolvimento que cada um liderou ao longo do projeto:

Kaio (kaiosilva-13)
Arquitetura e Configuração Inicial: Responsável pela criação da estrutura base do projeto e pela configuração inicial do módulo de biblioteca, além de gerenciar a integração de ramos (merges) no repositório.

Módulo de Usuários: Criação, configuração e exportação de todos os artefatos relacionados a usuários, o que engloba a implementação do controller, regras de negócio e geração de usuários genéricos.

Gerenciamento do Catálogo de Livros: Desenvolvimento das funcionalidades essenciais para manipulação de registros de livros, implementando métodos específicos para criação de novos registros, buscas por identificador único (ID), listagem geral, atualização e remoção do banco.

Melissa (mellyssat7)
Fluxo Completo de Empréstimos: Implementação de ponta a ponta do fluxo de empréstimo e devolução de livros, incluindo a estruturação do controller para exposição das rotas, codificação das regras de negócio no service e registro no módulo principal da aplicação.

Validação de Entrada de Empréstimos: Criação de Data Transfer Objects (DTOs) específicos para garantir a consistência e segurança das propriedades exigidas ao abrir ou encerrar um empréstimo.

Ambiente de Containerização (Docker): Responsável por criar e configurar os arquivos do Docker para permitir a execução, empacotamento e testes iniciais do ambiente de forma isolada.

Natan (natangte)
Desenvolvimento da Interface do Usuário (Front-end): Construção integral da pasta de interface, criando a estrutura estrutural em HTML (index.html), a estilização visual moderna (style.css) e a dinâmica do comportamento do cliente através de scripts em JavaScript (script.js).

Módulo de Filtragem de Livros: Criação da área de filtros no documento HTML, seu design estético e a implementação lógica em JavaScript para refinamento de buscas de livros.

Módulo de Edição Visual: Desenvolvimento do modal de edição de livros no front-end, realizando o isolamento correto do formulário de cadastro principal e aplicando estilos dedicados à interface de edição.

Ajustes e Integração: Correção de bugs de comunicação para integrar perfeitamente a interface cliente às rotas de API desenvolvidas no back-end.

Antony (antonythiago06)
Preparação para Produção e Deploy: Configuração de Cross-Origin Resource Sharing (CORS) para permitir a integração segura do front-end com o servidor, criação de rota de verificação de saúde da aplicação (health check) e atualização de todas as URLs de requisição do cliente para se comunicarem diretamente com a API implantada na plataforma Render.

Gerenciamento de Dependências e Segurança: Adição das bibliotecas class-validator e class-transformer nas dependências principais para realizar a validação automática e transformação segura de tipos de dados de entrada na API.

Validação de Dados (DTOs): Criação e alteração de propriedades em DTOs (Data Transfer Objects), incluindo correções de erros e ajustes no fluxo de criação de registros para garantir que parâmetros sensíveis como o ano de publicação fossem validados adequadamente.
## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
