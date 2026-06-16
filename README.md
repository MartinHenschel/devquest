# DevQuest

## Integrantes
Martin Silva


---

# Descrição do Projeto

O DevQuest é um sistema web de quiz de programação desenvolvido para auxiliar estudantes no aprendizado de conceitos básicos de desenvolvimento de software.

O sistema permite:

* Cadastro de usuários
* Login
* Responder perguntas de programação
* Acumular XP
* Visualizar ranking de usuários

O projeto foi desenvolvido utilizando arquitetura REST API com Node.js no back-end e HTML/CSS/JavaScript no front-end.

---

# Tecnologias Utilizadas

## Back-end

* Node.js
* Express
* MongoDB
* Mongoose

## Front-end

* HTML
* CSS
* JavaScript

## Documentação

* Swagger UI

## Observabilidade

* Prometheus
* Grafana
* Docker

---

# Funcionalidades

## CRUD de Usuários

* Criar usuário
* Listar usuários
* Atualizar usuário
* Login

## CRUD de Perguntas

* Criar pergunta
* Listar perguntas
* Atualizar pergunta
* Remover pergunta

## Sistema de Quiz

* Perguntas aleatórias
* Validação de respostas
* Sistema de XP
* Ranking de jogadores

---

# Estrutura do Projeto

devquest/

* server.js
* package.json
* docker-compose.yml
* README.md
* monitoring/
* models/
* public/

---

# Como Executar o Projeto

## Pré-requisitos

Instalar:

* Node.js
* Docker Desktop
* MongoDB Atlas

---

# Instalar dependências

```bash
npm install
```

---

# Executar aplicação

```bash
node server.js
```

Aplicação disponível em:

http://localhost:3000

---

# Swagger

Documentação da API:

http://localhost:3000/api-docs

---

# Monitoramento

## Subir Grafana e Prometheus

```bash
docker compose up -d
```

---

# URLs Monitoramento

## Prometheus

http://localhost:9090

## Grafana

http://localhost:3001

---

# Login Grafana

Usuário:
admin

Senha:
admin

---

# Métricas Monitoradas

* Uso de CPU
* Uso de memória
* Tempo de resposta HTTP
* Quantidade de requisições

---

# Banco de Dados

O projeto utiliza MongoDB Atlas para persistência de dados.

---

# Relacionamento das Entidades

Usuário ↔ Pontuação (XP)

Cada usuário possui pontuação baseada nas respostas corretas do quiz.

---

# Fluxo do Sistema

1. Usuário realiza cadastro
2. Usuário faz login
3. Sistema carrega perguntas
4. Usuário responde quiz
5. Sistema calcula XP
6. Ranking é atualizado

---
