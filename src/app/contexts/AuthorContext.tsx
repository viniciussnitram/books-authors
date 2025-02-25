import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IAuthor } from "../entities/IAuthor";
import { BookContext } from "./BookContext";

interface IAuthorContext {
  authors: IAuthor[];
  addAuthor: (author: IAuthor) => void;
  editAuthor: (updatedAuthor: IAuthor) => void;
  deleteAuthor: (id: string) => void;
  getAuthorById: (id: string) => IAuthor | undefined;
}

export const AuthorContext = createContext<IAuthorContext | undefined>(undefined);

interface IAuthorProviderProps {
  children: ReactNode;
}

export const AuthorProvider = ({ children }: IAuthorProviderProps) => {
  const [authors, setAuthors] = useState<IAuthor[]>(() => {
    const storedAuthors = localStorage.getItem("authors");
    return storedAuthors ? JSON.parse(storedAuthors) : [];
  });

  const bookContext = useContext(BookContext);

  useEffect(() => {
    localStorage.setItem("authors", JSON.stringify(authors));
  }, [authors]);

  const addAuthor = (author: IAuthor) => {
    setAuthors([...authors, author]);

    if (bookContext) {
      const updatedBook = bookContext.books.map((book) => {
        if (author.bookId.includes(book.id)) {
          return { ...book, authorId: [...new Set([...book.authorId, author.id])] };
        }
        return book;
      });

      updatedBook.forEach(bookContext.editBook);
    }
  };

  const editAuthor = (updatedAuthor: IAuthor) => {
    setAuthors(authors.map((author) => (author.id === updatedAuthor.id ? updatedAuthor : author)));

    if (bookContext) {
      const updatedBook = bookContext.books.map((book) => {
        if (updatedAuthor.bookId.includes(book.id)) {
          return { ...book, authorId: [...new Set([...book.authorId, updatedAuthor.id])] };
        } else {
          return { ...book, authorId: book.authorId.filter((id) => id !== updatedAuthor.id) };
        }
      });

      updatedBook.forEach(bookContext.editBook);
    }
  }

  const deleteAuthor = (id: string) => {
    setAuthors(authors.filter((author) => author.id !== id));

    if (bookContext) {
      const updatedBook = bookContext.books.map((book) => ({
        ...book,
        authorId: book.authorId.filter((authorId) => authorId !== id)
      }));

      updatedBook.forEach(bookContext.editBook);
    }
  };

  const getAuthorById = (id: string) => authors.find((author) => author.id === id);

  return (
    <AuthorContext.Provider value={{ authors, addAuthor, editAuthor, deleteAuthor, getAuthorById }}>
      {children}
    </AuthorContext.Provider>
  );
}