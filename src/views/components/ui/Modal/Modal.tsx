import { Cross2Icon, EyeOpenIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";
import { useContext } from "react";
import { IsBookSelectedContext } from "../../../../app/contexts/IsBookSelectedContext";
import { IModalProps } from "../../../../app/types/modal";
import AuthorForm from "../Authors/AuthorForm/AuthorForm";
import AuthorView from "../Authors/AuthorView/AuthorView";
import BookForm from "../Books/BookForm/BookForm";
import BookView from "../Books/BookView/BookView";
import Button from "../Button/Button";
import { ModalContent, ModalHeader, ModalOverlay } from "./Modal.styles";

function Modal({ id, viewMode }: IModalProps) {
  const isBookSelectedContext = useContext(IsBookSelectedContext);

  if (!isBookSelectedContext) return <p>Carregando...</p>;

  const { isBookSelected } = isBookSelectedContext;
  const entity = isBookSelected ? "livro" : "autor(a)";

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          {viewMode === "view" ? (
            <EyeOpenIcon height="16px" width="16px" />
          ) : viewMode === "edit" ? (
            <Pencil1Icon height="16px" width="16px" />
          ) : (
            <PlusIcon />
          )}
          {viewMode === "create" && ` Cadastrar ${entity}`}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay>
          <ModalOverlay />
        </Dialog.Overlay>
        <Dialog.Content>
          <ModalContent>
            <ModalHeader>
              <div>
                <Dialog.Title>
                  {viewMode === "view"
                    ? `Detalhes do ${entity}`
                    : viewMode === "edit"
                      ? `Editar ${entity}`
                      : `Cadastrar ${entity}`}
                </Dialog.Title>
                <Dialog.Description>
                  {viewMode === "view"
                    ? `Veja as informações do ${entity}.`
                    : viewMode === "edit"
                      ? `Altere as informações do ${entity}.`
                      : `Adicione informações do novo ${entity}.`}
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <Cross2Icon />
              </Dialog.Close>
            </ModalHeader>

            {viewMode === "view" ? (
              isBookSelected ? <BookView id={id as string} /> : <AuthorView id={id as string} />
            ) : (
              isBookSelected ? <BookForm id={id as string} /> : <AuthorForm id={id as string} />
            )}
          </ModalContent>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
