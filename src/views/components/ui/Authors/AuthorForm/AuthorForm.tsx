import { Dialog } from "radix-ui";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthorContext } from "../../../../../app/contexts/AuthorContext";
import { BookContext } from "../../../../../app/contexts/BookContext";
import { IAuthor } from "../../../../../app/entities/IAuthor";
import { IAuthorForm } from "../../../../../app/types/authorForm";
import Button from "../../Button/Button";
import { Buttons, CheckboxContainer, Form, InputContainer, TextAreaContainer } from "./AuthorForm.styles";

function AuthorForm({ id }: IAuthorForm) {
  const authorContext = useContext(AuthorContext);
  const bookContext = useContext(BookContext);

  if (!authorContext || !bookContext) return <p>Carregando...</p>;

  const { addAuthor, getAuthorById, editAuthor } = authorContext;
  const { books } = bookContext;
  const authorById = getAuthorById(id as string);

  const form = useForm<IAuthor>({
    defaultValues: {
      name: id ? authorById?.name : '',
      biography: id ? authorById?.biography : '',
    }
  });

  const onSubmit = (data: IAuthor) => {
    const getLastAuthorId = () => Number(localStorage.getItem("lastAuthorId") || -1);
    const setLastAuthorId = (id: string) => localStorage.setItem("lastAuthorId", id);

    if (id) {
      const payload = {
        id,
        name: data.name,
        biography: data.biography,
        bookId: data.bookId
          ? Array.isArray(data.bookId)
            ? data.bookId.map(String)
            : [String(data.bookId)]
          : ['']
      };

      editAuthor(payload);
    } else {
      const newId = String(getLastAuthorId() + 1);
      setLastAuthorId(newId);

      const payload = {
        id: newId,
        name: data.name,
        biography: data.biography,
        bookId: data.bookId
          ? Array.isArray(data.bookId)
            ? data.bookId.map(String)
            : [String(data.bookId)]
          : ['']
      };

      addAuthor(payload);
    }

    window.location.reload();
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <InputContainer>
        <label htmlFor="">Nome:</label>
        <input type="text" {...form.register("name", { required: true })} />

        {form.formState.errors.name && <span>O nome do(a) autor(a) é obrigatório.</span>}
      </InputContainer>

      <TextAreaContainer>
        <label htmlFor="">Biografia:</label>
        <textarea {...form.register("biography", { required: true })} />

        {form.formState.errors.biography && <span>A biografia do(a) autor(a) é obrigatória.</span>}
      </TextAreaContainer>

      {books.length === 0 && (
        <p>
          <strong>OBS:</strong>
          {" "}Ainda não há livros cadastrados. Primeiro cadastre o autor, depois cadastre o livro e edite o autor.
        </p>
      )}
      <CheckboxContainer>
        <label>Autor(a)</label>
        {books.map((book) => (
          <div key={book.id}>
            <input type="checkbox" value={book.id} {...form.register('bookId', { required: false })} />
            <label htmlFor="">{book.title}</label>
          </div>
        ))}
      </CheckboxContainer>

      <Buttons>
        <Dialog.Close asChild>
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
        </Dialog.Close>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Buttons>
    </Form>
  );
}

export default AuthorForm;