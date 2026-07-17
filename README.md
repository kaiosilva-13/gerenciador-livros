# Sistema de Gerenciamento de Livros e Empréstimos

Este projeto consiste em uma aplicação voltada ao controle de acervo e fluxo de empréstimos, desenvolvida como atividade prática para a disciplina de Desenvolvimento Back-end. O sistema foi projetado de forma modular utilizando o ecossistema NestJS no back-end integrado a uma interface cliente funcional, aplicando conceitos de arquitetura restrita para atender aos requisitos essenciais de uma biblioteca.

---

## Escopo e Arquitetura do Projeto

A aplicação foi estruturada para suportar duas frentes de operação principais:

1. **Sistema Administrativo (Painel do RH / Biblioteca):** Interface dedicada à gestão do acervo físico. Permite o cadastro de novos títulos, consulta dinâmica através de parâmetros de filtro de busca, exclusão de registros e alteração manual do status de disponibilidade das obras.
2. **Área de Autoatendimento do Leitor:** Portal para uso do cliente final, onde o usuário visualiza seus dados de identificação, consulta o catálogo disponível para empréstimo no momento e realiza o pedido de forma autônoma, atualizando o status do acervo em tempo real no servidor.

O projeto foi delimitado para consolidar o aprendizado prático de rotas HTTP, validação de dados de entrada e comunicação entre o servidor e a interface de usuário.

---

## Contribuições do Time

A divisão de responsabilidades no desenvolvimento da aplicação foi distribuída de forma colaborativa entre os integrantes do grupo:

### Kaio Silva (Líder do Projeto)
* **Regras de Negócio do Sistema:** Desenvolvimento e implementação de toda a lógica e inteligência por trás das regras de negócio (como o controle de disponibilidade de livros, validação cruzada e o limite máximo de empréstimos ativos por leitor).
* **Módulo de Usuários:** Estruturação completa da seção de usuários da biblioteca, garantindo que o sistema identifique, cadastre e gerencie os leitores aptos a usar a plataforma.

### Melyssa Tainá
* **Módulo de Biblioteca (Rotas e Controle):** Desenvolvimento do controlador `biblioteca.controller.ts`, sendo responsável pela criação e estruturação de todas as rotas da API (`GET` para listagem e buscas com filtros de busca, `GET` por ID de livro específico, `POST` para cadastro de novas obras, `PATCH` para edições parciais e `DELETE` para remoção com retorno de status `204 No Content`).
* **Estruturação do Módulo de Empréstimos:** Responsável pela criação inicial e organização de toda a pasta de empréstimos, estruturando e configurando os arquivos principais que dão vida ao recurso (`Module`, `Controller`, `Service` e o arquivo de validação de dados `criar-emprestimo.dto.ts`).

### Natanael
* **Desenvolvimento da Interface Gráfica:** Responsável por criar e estruturar visualmente as duas principais divisões da aplicação:
  * **Interface do Sistema (Administrativo / RH):** O painel onde o administrador faz a gestão, cadastro, exclusão e alteração de status dos livros.
  * **Interface do Usuário (Área do Leitor):** O portal visual de autoatendimento onde os leitores visualizam suas informações, filtram o acervo disponível e realizam seus empréstimos.

### Anthony Thiago
* **Comunicação de Dados (DTOs):** Criação e estruturação de Data Transfer Objects (DTOs) e mapeamento dos objetos para garantir que os dados trafegados entre a interface visual e o servidor backend estivessem de acordo com a tipagem esperada.
* **Deploy da Aplicação:** Responsável por configurar e colocar o sistema no ar (deploy no ambiente de produção), garantindo que a API e a interface fossem acessíveis online.

---

## Tecnologias Utilizadas

* **NestJS / TypeScript:** Estruturação do servidor e desenvolvimento das rotas da API.
* **HTML / CSS / JavaScript:** Desenvolvimento e estilização das interfaces visuais do sistema.
