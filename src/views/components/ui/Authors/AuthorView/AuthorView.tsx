import { Dialog } from "radix-ui";
import { useContext } from "react";
import { AuthorContext } from "../../../../../app/contexts/AuthorContext";
import { IAuthorViewProps } from "../../../../../app/types/authorView";
import Button from "../../Button/Button";
import { AllAuthorBooks, AuthorViewStyled } from "./AuthorView.styles";

function AuthorView({ id }: IAuthorViewProps) {
  const authorContext = useContext(AuthorContext);

  if (!authorContext) return <p>Carregando...</p>
  const { getAuthorById } = authorContext;
  const authorById = getAuthorById(id);

  return (
    <AuthorViewStyled>
      <ul>
        <li>
          <h4>ID</h4>
          <span>{authorById?.id}</span>
        </li>
        <li>
          <h4>Nome</h4>
          <span>{authorById?.name}</span>
        </li>
        <li>
          <h4>Biografia</h4>
          <span>{authorById?.biography}</span>
        </li>
        <li>
          <h4>Livros</h4>
          {authorById &&
            authorById.bookId.length > 0 &&
            !(authorById.bookId.length === 1 && authorById.bookId[0] === '') ? (
            <AllAuthorBooks>
              {authorById.bookId.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </AllAuthorBooks>
          ) : (
            <p>Não há livro.</p>
          )}
        </li>
      </ul>

      <Dialog.Close asChild>
        <Button>Fechar</Button>
      </Dialog.Close>
    </AuthorViewStyled>
  );
}

export default AuthorView;