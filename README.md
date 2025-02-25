# Consulta de Livros e Autores(as) - Contato Seguro
Aplicação para realização de CRUD (Create, Read, Update, Delete) para livros e autores, onde é possível visualizar os dados de cada um em suas respectivas tabelas.

## Tecnologias utilizadas
- React + TypeScript (Vite)
- React Hook Form
- TanStack Table
- Radix UI
- Styled Components
- Docker

## Como executar o projeto
1. Clone o repositório
```bash
git clone https://github.com/viniciussnitram/books-authors.git
cd books-authors
```
2. Instale as dependências
```bash
npm install
```
ou
```bash
yarn
```
3. Inicie o servidor
```bash
npm run dev
```
ou
```bash
yarn dev
```
4. Acesse a aplicação
Abra o navegador e vá para: http://localhost:3000

## Rodando com Docker (Opcional)
### Utilizando Dockerfile

1. Construa a imagem Docker:
```bash
docker build -t books-authors .
```
2.Execute o container:
```bash
docker run -p 3000:3000 books-authors
```
3.Acesse a aplicação em http://localhost:3000