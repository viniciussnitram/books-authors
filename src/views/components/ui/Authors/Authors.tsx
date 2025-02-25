import { useContext, useEffect, useState } from "react";
import { BookContext } from "../../../../app/contexts/BookContext";
import { IAuthor } from "../../../../app/entities/IAuthor";
import { ordersServices } from "../../../../app/services/ordersServices";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";

function Authors() {
  const bookContext = useContext(BookContext);
  if (!bookContext) return <p>Carregando...</p>

  const { books } = bookContext;

  const [data, setData] = useState<IAuthor[]>([]);

  useEffect(() => {
    const storedAuthors = ordersServices.get("authors");
    setData(storedAuthors);
  }, []);

  const getBookName = (bookId: string[]) => {
    return books
      .filter((book) => bookId.includes(book.id))
      .map((book) => book.title);
  }

  const authorsWithBooks = data.map((author) => ({
    ...author,
    bookName: getBookName(author.bookId || []),
  }));

  if (!data || data.length === 0) {
    return (
      <section>
        <p>Não há autores(as) cadastrados, clique aqui para cadastrar:</p>
        <Modal viewMode='create' />
      </section>
    )
  }

  return (
    <>
      <Modal viewMode='create' />
      <Table
        data={authorsWithBooks}
        columns={[
          { accessorKey: 'id', header: 'ID' },
          { accessorKey: 'name', header: 'Nome' },
          { accessorKey: 'biography', header: 'Biografia' },
          { accessorKey: 'bookName', header: 'Livros' }
        ]}
      />
    </>
  );
}

export default Authors;