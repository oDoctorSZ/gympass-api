# Gympass Style App

# This API is a recriation of base gympass functionalities, that includes Authentication (RBAC), and the most important functionalities listed below

# Requisitos Funcionais

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (Até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastras uma academia;

# Regras de Negócio

- [X] O usuário não deve poder se cadastras com um email duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser válidado até 20 minutos após ser criado;
- [X] O check-in só pode ser válidado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

# Requisitos Não Funcionais

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas as listas de dados precisam estar paginadas em 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON WEB TOKEN);