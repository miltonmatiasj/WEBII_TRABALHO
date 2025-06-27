# Sistema de Manutenção de Computadores

Este projeto foi desenvolvido para a disciplina de Desenvolvimento Web II e consiste em um sistema completo para gerenciamento de solicitações de manutenção de computadores. A aplicação trata tanto o lado do **usuário solicitante** quanto do **técnico responsável**, oferecendo funcionalidades específicas para cada perfil.

## Tecnologias Utilizadas

### Frontend
- **Angular CLI**: `19.2.4`
- **Componentes Standalone**
- **Angular Material**
- **Node.js**: `22.13.1`
- **npm**: `10.9.2`

### Backend
- **Spring Boot (Java)**
- **Classe principal**: `ProjetoWeb2Application`
- **API REST**
- **MySQL** – Banco de dados: `web2`
- **Mailgun** – Serviço de envio de e-mails

## Funcionalidades

- Login separado para técnicos e usuários
- Criação e acompanhamento de solicitações de manutenção
- Criação de novos tipos de equipamentos para solicitação
- Atribuição de serviços aos técnicos
- Redirecionamento de serviços para outros técnicos
- Envio automático de senha de acesso por e-mail (via Mailgun)
- Senha gerada aleatoriamente com 4 dígitos

## Como Executar o Projeto

### 1. Banco de Dados

- Crie o banco de dados MySQL com o nome **`web2`**.
- No projeto Spring Boot, edite o arquivo `src/main/resources/application.properties` e ajuste:
  - Usuário do banco
  - Senha do banco
  - Porta de conexão

### 2. Configuração do Mailgun

- Registre um domínio no [Mailgun](https://www.mailgun.com/).
- Obtenha a **chave da API**.
- Insira essa chave, o domínio e o <i>sender</i> no `application.properties`.

> **Atenção:** Se o Mailgun não estiver configurado corretamente, a senha gerada será exibida no **console do navegador (console.log)** ao tentar fazer login.

### 3. Execução do Sistema

1. Execute a classe `ProjetoWeb2Application` para iniciar o backend com Spring Boot.
2. Em seguida, inicie o projeto Angular com o comando apropriado (ex: `ng serve`).
3. Acesse a aplicação em: [http://localhost:4200](http://localhost:4200)

---

**Aproveite o sistema e faça suas solicitações 😊**

