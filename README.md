# Gerenciamento de Produtos e Categorias

Este projeto é uma API para gerenciar produtos, categorias e autenticação de usuários. A API permite criar, atualizar, listar e buscar dados de produtos e categorias, além de oferecer funcionalidades de registro e login de usuários.

---

## ⚙️ Funcionalidades

### **Autenticação de Usuário**
- **Registro de Usuário:** Crie uma conta com nome, e-mail e senha.
- **Login de Usuário:** Faça login utilizando e-mail e senha para obter um token JWT que será usado para acessar as rotas protegidas.

### **Gerenciamento de Produtos**
- **Criar Produto:** Adicione um novo produto com nome, descrição, quantidade, preço e categorias associadas.
- **Editar Produto:** Edite as informações do produto.
- **Atualizar Produto:** Atualize informações do produto, mantendo ou alterando categorias associadas.
- **Buscar Produto por Categoria:** Liste produtos com base em uma categoria específica.
- **Listar Todos os Produtos:** Obtenha uma lista de todos os produtos cadastrados.
- **Buscar um Produto:** Obtenha o produto do ID fornecido.
- **Deletar Produto:** Exclua o produto por ID.


### **Gerenciamento de Categorias**
- **Criar Categoria:** Adicione uma nova categoria com nome e descrição.
- **Editar Categoria:** Edite as informações de uma categoria.
- **Atualizar Categoria:** Atualize informações de uma categoria.
- **Listar Todas as Categorias:** Obtenha uma lista de todas as categorias cadastradas.
- **Buscar uma Categoria:** Obtenha a categorias do ID fornecido.
- **Deletar Categoria:** Exclua uma nova categoria por ID.
---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) Plataforma para executar JavaScript no servidor.
- [Express.js](https://expressjs.com/) Framework para gerenciar rotas e criar APIs.
- [MongoDB(Atlas)]([https://www.mongodb.com/cloud)]Banco de dados NoSQL para armazenamento de dados.
- [Mongoose](https://mongoosejs.com/) Biblioteca para interação com o MongoDB.
- [JWT (Json Web Token)](https://jwt.io/)  Para autenticação baseada em tokens.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) Para hashing de senhas.
- [Dotenv](https://github.com/motdotla/dotenv) Gerenciamento de variáveis de ambiente.

---

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **[Node.js](https://nodejs.org/)**
- **[MongoDB (Atlas)]((https://www.mongodb.com/cloud/atlas/register))**
- Um cliente REST para testes, como **[Postman](https://www.postman.com/)** ou **[Insomnia](https://insomnia.rest/)**.

---

## 🛠️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/douglas0097/Teste_Opa.git
   cd Teste_Opa
2. **Instale as dependencias:**
    ```bash
    npm install
3. **Configure o arquivo .env:** Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
    ```bash
    DB_USER= (seu_usuario_do_banco)
    DB_PASS= (sua_senha_do_banco)
    SECRET= (sua_chave_secreta)

4. **Configure o arquivo dbConfig.js** No arquivo dbConfig.js faça alteração da variavel `uri`, para a sua própria string de conexação ao MongoDB Atlas, fazendo alteração do USUÁRIO e SENHA, para as variaveis dbUser e dbPass.
   ```bash
        const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster1.eguyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

   
6. **Inicie o servidor**
    ```bash
    npm run start
---

## 🧪 Executando a API

### **Autenticação**
   
1. **Registro de usuário**
- Endpoint: POST `/auth/register`
- Body Exemplo:
  ```json
  {
  "name": "Usuário Teste",
  "email": "teste@example.com",
  "password": "senha123",
  "confirmpassword": "senha123"
  }

2. **Login de Usuário**
- Endpoint: POST /auth/login
- Body Exemplo:
  ```json
   {
    "email": "teste@example.com",
    "password": "senha123"
    }

- Resposta exemplo
  ```json
  {
    "msg": "Login feito com sucesso!",
    "token": "seu-token-jwt"
  }

### Autorização

1. **Inclua o token JWT no cabeçalho das solicitações às rotas protegidas:**
   
   Authorization: Bearer seu-token-aqui
   
### Rotas disponíveis

1. **Produtos**
- **Criar Produto:** POST `/products/register`(Requer atenticação)

    Body Exemplo:
    ```json
    {
      "name": "Nome do Produto",
      "description": "Descrição do Produto",
      "amount": 10,
      "price": 99.99,
      "categories": ["Categoria1", "Categoria2"]
    }
- **Editar Produto:** PUT `/products/edit/:id`(Requer atenticação)
    
    Body Exemplo:
    ```json
    {
    "name": "Novo Nome",
    "description": "Nova Descrição",
    "amount": 15,
    "price": 79.99,
    "categories": ["NovaCategoria1", "NovaCategoria2"]
    }
- **Atualizer Produto** PATCH `/products/update/:id`

    Body Exemplo:
    ```json
    {
    "name": "Nome Atualizado",
    "categories": ["CategoriaAtualizada"]
    }
- **Listar Produtos de uma Categoria:** GET `/products/by-category/:categoryName`
- **Listar Todos os Produtos:** GET `/products`
- **Buscar produto especifico** GET `/products/:id`
- **Deletar produto** DELETE `/products/delete/:id`(Requer atenticação)

---

2. **Categorias**
- **Criar categoria** POST `/categories/register` (Requer atenticação)
  
    Body Exemplo:
    ```json
    {
      "name": "Nome da Categoria",
      "description": "Descrição da Categoria"
    }
- **Editar categoria** PUT `/categories/edit/:id` (Requer atenticação)
  
    Body Exemplo:
    ```json
    {
    "name": "Novo Nome",
    "description": "Nova Descrição"
    }
- **Atualizar categoria** PATCH `/categories/update/:id`

    Body Exemplo:
    ```json
    {
    "name": "Nome Atualizado"
    }
- **Listar todas as caregorias** `/categories/`
- **Buscar categoria especificia** `/categories/:id`
- **Deletar categoria** DELETE `/categories/delete/:id`(Requer atenticação)

## 👨‍💻 Autor
Desenvolvido por **Douglas Rodrigues de Almeida**.
  
