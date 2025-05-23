# 💸 Cashforce Challenge

Este projeto é uma aplicação fullstack desenvolvida como parte de um desafio técnico. A proposta consiste em consumir uma base de dados com informações de pedidos (notas fiscais) e exibi-los de forma organizada e responsiva na interface.

---

## 🧠 Funcionalidades

### ✅ Backend (Node.js + Express + Sequelize)

- API RESTful para consulta de pedidos (`/orders`)
- Integração com banco de dados MySQL
- Associação entre tabelas (buyers, providers, cnpjs, users)
- Mapeamento de status descritivo (`statusDescription`)
- Documentação da API com Swagger
- Testes com Jest e Supertest
- Cobertura completa dos principais fluxos da API

### ✅ Frontend (Vue.js + Vite)

- Página principal com listagem de notas fiscais:
  - Número da nota
  - Sacado
  - Cedente
  - Emissão formatada
  - Valor formatado
  - Status do pedido
- Interface responsiva (desktop, tablet, mobile)
- Sidebar com navegação via `vue-router`
- Estilização com Tailwind CSS
- Testes com Vitest + Vue Test Utils
- Alta cobertura dos componentes principais

---

## 🚀 Tecnologias utilizadas

| Tecnologia       | Descrição                                  |
| ---------------- | ------------------------------------------ |
| **Node.js**      | Plataforma backend                         |
| **Express**      | Framework para APIs                        |
| **Sequelize**    | ORM para banco de dados MySQL              |
| **Swagger**      | Documentação da API                        |
| **Jest**         | Testes backend                             |
| **Vue 3**        | Framework frontend                         |
| **Vite**         | Ferramenta de build                        |
| **Tailwind CSS** | Estilização moderna                        |
| **Vitest**       | Testes unitários frontend                  |
| **Vue Test Utils** | Testes de componentes Vue                |
| **jsdom**        | Ambiente simulado de DOM                   |

---

## 🛠️ Como rodar o projeto localmente

### 1. Clone os repositórios

```bash
git clone https://github.com/michael-petterson-06/Cashforce.git

```

### 2. Inicie o backend

```bash
cd cashforce-api
yarn install
yarn dev
```

A API estará disponível em `http://localhost:3000`.

### 3. Inicie o frontend

```bash
cd cashforce-frontend
yarn install
yarn dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 🧪 Testes

### Backend

- Testes com Jest e Supertest
- Testes de `/orders` com verificação de status e mapeamento
- Cobertura alta dos casos de sucesso e falha

### Frontend

- Testes unitários e de integração
- `OrderRow.vue`, `Home.vue`, `Sidebar.vue`
- Cobertura atual superior a **69%**

```bash
yarn test
# ou
yarn test:unit
yarn test:unit2 # com coverage
```

---

### Swegger

```bash
http://localhost:3000/api-docs

```


## 🖼️ Imagens

### 💻 Desktop

![Desktop](/frontend/src/assets/front-1.png)

### 📱 Tablet

![Tablet](/frontend/src/assets/front-2.png)

### 📱 Mobile

![Mobile](/frontend/src/assets/front-3.png)

---

## 📌 Melhorias Futuras

- [ ] Adicionar autenticação
- [ ] Adicionar filtros de data
- [ ] Otimizações de acessibilidade

---

## 🙋‍♂️ Autor

Desenvolvido por **Michael Petterson**  
📫 **E-mail:** michaelpetterson06@gmail.com  
🌐 [Portfólio](https://michael-petterson-06.github.io/portfolio-mike)

---

## 📃 Licença

Este projeto está sob a licença **MIT**.  
Desenvolvido para o desafio técnico da empresa **Cashforce**.