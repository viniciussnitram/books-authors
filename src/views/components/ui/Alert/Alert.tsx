import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog } from "radix-ui";
import { useContext } from "react";
import { AuthorContext } from "../../../../app/contexts/AuthorContext";
import { BookContext } from "../../../../app/contexts/BookContext";
import { IsBookSelectedContext } from "../../../../app/contexts/IsBookSelectedContext";
import { IAlert } from "../../../../app/types/alert";
import Button from "../Button/Button";
import { AlertContainer, AlertOverlay, Buttons } from "./Alert.styles";

function Alert({ id }: IAlert) {
  const isBookSelectedContext = useContext(IsBookSelectedContext);
  const bookContext = useContext(BookContext);
  const authorContext = useContext(AuthorContext);

  if (!isBookSelectedContext || !bookContext || !authorContext) return <p>Carregando...</p>;

  const { isBookSelected } = isBookSelectedContext;
  const { deleteBook } = bookContext;
  const { deleteAuthor } = authorContext;

  const handleDelete = () => {
    if (isBookSelected) {
      deleteBook(id);
      window.location.reload();
    } else {
      deleteAuthor(id);
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild aria-hidden inert>
        <Button variant="delete">
          <TrashIcon height='16px' width='16px' />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertOverlay>
          <AlertContainer>
            <div>
              <AlertDialog.Title>{isBookSelected ? 'Excluir livro' : 'Excluir autor(a)'}</AlertDialog.Title>
              <AlertDialog.Description>
                Você tem certeza que deseja excluir{" "}
                {isBookSelected ? 'esse livro?' : 'esse(a) autor(a)?'}
                {isBookSelected ? ' Esse livro' : ' Esse(a) autor(a)'}{" "}
                vai deixar de existir e você não vai ter mais acesso aos seus dados.
              </AlertDialog.Description>
            </div>

            <Buttons>
              <AlertDialog.Cancel asChild>
                <Button variant="secondary">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button variant="delete" onClick={handleDelete}>
                  Excluir
                </Button>
              </AlertDialog.Action>
            </Buttons>
          </AlertContainer>
        </AlertOverlay>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default Alert;