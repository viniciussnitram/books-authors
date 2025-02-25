import { Dialog } from "radix-ui";
import { useContext } from "react";
import { BookContext } from "../../../../../app/contexts/BookContext";
import { IBookViewProps } from "../../../../../app/types/bookView";
import Button from "../../Button/Button";
import { AllBookAuthors, BookViewStyled } from "./BookView.styles";

function BookView({ id }: IBookViewProps) {
  const bookContext = useContext(BookContext);

  if (!bookContext) return <p>Carregando...</p>;
  const { getBookById } = bookContext;

  const bookById = getBookById(id);

  return (
    <BookViewStyled>
      <ul>
        <li>
          <h5>ID</h5>
          <span>{bookById?.id}</span>
        </li>
        <li>
          <h5>Título</h5>
          <span>{bookById?.title}</span>
        </li>
        <li>
          <h5>Gênero</h5>
          <span>{bookById?.genre}</span>
        </li>
        <li>
          <h5>Autores</h5>
          <ul>
            {bookById &&
              bookById.authorId.length > 0 &&
              !(bookById.authorId.length === 1 && bookById.authorId[0] === '') ? (
              <AllBookAuthors>
                {bookById.authorId.map((book, index) => (
                  <li key={index}>{book}</li>
                ))}
              </AllBookAuthors>
            ) : (
              <p>Não há autor(a).</p>
            )}
          </ul>
        </li>
      </ul>

      <Dialog.Close asChild>
        <Button>Fechar</Button>
      </Dialog.Close>
    </BookViewStyled>
  );
}

export default BookView;