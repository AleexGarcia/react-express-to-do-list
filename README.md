# Aplicação To-Do List Fullstack

Bem-vindo à aplicação To-Do List Fullstack! Esta aplicação permite que os usuários gerenciem suas tarefas de maneira eficaz. Ela foi desenvolvida com Express, JWT e TypeORM para o backend, e React.js, Tailwind CSS, Radix UI para o frontend. Banco de dados utilizado foi o PostgreSQL. 

![captura da tela](/frontend/captura.png)

## Recursos

- Autenticação segura com tokens JWT.
- Cadastro e autenticação de usuários.
- Criação, exclusão e marcação de tarefas como completas.
- Listagem de tarefas com opção de filtragem por status.
- Interface responsiva para uso em dispositivos móveis e desktop.

## Instruções de Instalação e Uso

### Pré-requisitos

- Node.js e npm instalados.
- Banco de dados PostgreSQL configurado.

### Backend (Express, JWT, TypeORM)

1. Navegue até a pasta `backend`:

```bash
cd backend
```

2. Instale as dependencias:
```bash
npm install
```
3. Configure o banco de dados: Abra o arquivo data-source.ts e ajuste as configurações de conexão do banco de dados.

4. Execute as migrações para criar as tabelas do banco de dados:
```bash
npm run migration:run
```
5. Inicie o servidor:
```bash
npm run dev
```
O servidor estará em execução em http://localhost:3001

### Frontend (React.js, Tailwind CSS, Radix UI, TypeScript)
1. Navegue até a pasta frontend:
```bash
cd frontend
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o aplicativo de desenvolvimento:
```bash
npm run dev
```
O aplicativo estará acessível em http://localhost:3000

### Levantamento de Requisitos

Aqui estão os principais requisitos da aplicação To-Do List Fullstack:

#### Requisitos Funcionais:

Cadastro de Usuário:

+ Os usuários devem poder se cadastrar na aplicação fornecendo um nome de usuário, um endereço de e-mail e uma senha.
+ Os campos devem ser validados para garantir a integridade dos dados.

Autenticação:

+ Os usuários cadastrados devem poder fazer login na aplicação utilizando seu endereço de e-mail e senha.
+ A autenticação será baseada em tokens JWT (JSON Web Tokens) para garantir a segurança das informações.

Criar Tarefa:

+ Os usuários autenticados devem poder criar novas tarefas.
+ Cada tarefa deve ter um título e um status que indica se a tarefa está completa ou não.

Listar Tarefas:

+ As tarefas do usuário devem ser listadas na página principal da aplicação.
+ Deve haver uma opção para filtrar tarefas por status (completas, incompletas, todas).

Marcar Tarefa como Completa:

+ Os usuários devem poder marcar uma tarefa como completa.
+ A interface deve refletir visualmente o status da tarefa.

Excluir Tarefa:

+ Os usuários devem poder excluir tarefas que já foram concluídas ou que não são mais relevantes.

#### Requisitos Não-Funcionais:

Segurança:

+ A autenticação deve ser segura, usando tokens JWT para proteger as rotas e os dados do usuário.

Responsividade:

+ A interface da aplicação deve ser responsiva, garantindo uma boa experiência em dispositivos móveis e desktop.

Usabilidade:

+ A interface deve ser intuitiva e fácil de usar, com feedback visual claro sobre as ações realizadas.

Performance:

+ A aplicação deve ser otimizada para carregamento rápido e eficiência no consumo de recursos

### Levantamento de Classes 

User:

+  Atributos: id, username, email, password
+  Relações: Uma User tem muitas Task
+ Métodos: Nenhum método especial

Task:

+ Atributos: id, title, status (boolean), userId
+ Relações: Uma Task pertence a um User
+ Métodos: Nenhum método especial

AuthenticationMiddleware:

+ Responsável por verificar a autenticação do usuário antes de permitir o acesso a certas rotas.

Routes:

+ /auth/signup: Rota para cadastro de novos usuários
+ /auth/login: Rota para autenticação e geração de token JWT
+ /auth/verify: Rota para verificar a autenticidade do token JWT
+ /task/: Rota criar uma nova tarefa do usuario autenticado
+ /task/id: Rota para recuperar, deletar e atualizar tarefa do usuário autenticado
+ /tasks: Rota para listar todas a tarefas e deletar as tarefas concluidas do usuário autenticado

### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorias.

