import { Dialog } from "radix-ui";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthorContext } from "../../../../../app/contexts/AuthorContext";
import { BookContext } from "../../../../../app/contexts/BookContext";
import { IBook } from "../../../../../app/entities/IBook";
import { IBookFormProps } from "../../../../../app/types/bookForm";
import Button from "../../Button/Button";
import { Buttons, CheckboxContainer, Form, InputContainer } from "./BookForm.styles";

function BookForm({ id }: IBookFormProps) {
  const bookContext = useContext(BookContext);
  const authorContext = useContext(AuthorContext);

  if (!bookContext || !authorContext) return <p>Carregando...</p>;

  const { addBook, getBookById, editBook } = bookContext;
  const { authors } = authorContext;
  const bookById = getBookById(id as string);

  const form = useForm<IBook>({
    defaultValues: {
      title: id ? bookById?.title : '',
      genre: id ? bookById?.genre : '',
    }
  });

  const onSubmit = (data: IBook) => {
    const getLastBookId = () => Number(localStorage.getItem("lastBookId") || -1);
    const setLastBookId = (id: string) => localStorage.setItem("lastBookId", id);

    if (id) {
      const payload = {
        id,
        title: data.title,
        genre: data.genre,
        authorId: data.authorId
          ? Array.isArray(data.authorId)
            ? data.authorId.map(String)
            : [String(data.authorId)]
          : ['']
      }

      editBook(payload);
    } else {
      const newId = String(getLastBookId() + 1);
      setLastBookId(newId);

      const payload = {
        id: newId,
        title: data.title,
        genre: data.genre,
        authorId: data.authorId
          ? Array.isArray(data.authorId)
            ? data.authorId.map(String)
            : [String(data.authorId)]
          : ['']
      }

      addBook(payload);
    }

    window.location.reload();
  }

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <InputContainer>
        <label htmlFor="">Título:</label>
        <input type="text" {...form.register("title", { required: true })} />

        {form.formState.errors.title && <span>O título do livro é obrigatório.</span>}
      </InputContainer>

      <InputContainer>
        <label htmlFor="">Gênero:</label>
        <input type="text" {...form.register("genre", { required: true })} />

        {form.formState.errors.genre && <span>O gênero do livro é obrigatório.</span>}
      </InputContainer>

      <CheckboxContainer>
        <label>Autores(as)</label>
        {authors.map((author) => (
          <div key={author.id}>
            <input type="checkbox" value={author.id} {...form.register('authorId', { required: false })} />
            <label htmlFor="">{author.name}</label>
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

export default BookForm;