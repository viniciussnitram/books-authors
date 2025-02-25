import { useContext, useEffect, useState } from "react";
import { AuthorContext } from "../../../../app/contexts/AuthorContext";
import { IBook } from "../../../../app/entities/IBook";
import { ordersServices } from "../../../../app/services/ordersServices";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";

function Books() {
  const authorContext = useContext(AuthorContext);
  if (!authorContext) return <p>Carregando...</p>;

  const { authors } = authorContext;

  const [data, setData] = useState<IBook[]>([]);

  useEffect(() => {
    const storedBooks = ordersServices.get("books");
    setData(storedBooks);
  }, []);

  const getAuthorName = (authorId: string[]) => {
    return authors
      .filter((author) => authorId.includes(author.id))
      .map((author) => author.name);
  }

  const booksWithAuthors = data.map((book) => ({
    ...book,
    authorName: getAuthorName(book.authorId || []),
  }));

  if (!data || data.length === 0) {
    return (
      <section>
        <p>Não há livros cadastrados, clique aqui para cadastrar:</p>
        <Modal viewMode='create' />
      </section>
    );
  }

  return (
    <>
      <Modal viewMode='create' />
      <Table
        data={booksWithAuthors}
        columns={[
          { accessorKey: 'id', header: 'ID' },
          { accessorKey: 'title', header: 'Título' },
          { accessorKey: 'genre', header: 'Gênero' },
          { accessorKey: 'authorName', header: 'Autores(as)' }
        ]}
      />
    </>
  );
}

export default Books;