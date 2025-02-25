import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IBook } from "../entities/IBook";
import { AuthorContext } from "./AuthorContext";

interface IBookContext {
  books: IBook[];
  addBook: (book: IBook) => void;
  editBook: (updatedBook: IBook) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => IBook | undefined;
}

export const BookContext = createContext<IBookContext | undefined>(undefined);

interface IBookProviderProps {
  children: ReactNode;
}

export const BookProvider = ({ children }: IBookProviderProps) => {
  const [books, setBooks] = useState<IBook[]>(() => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const authorContext = useContext(AuthorContext);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book: IBook) => {
    setBooks([...books, book]);

    if (authorContext) {
      const updatedAuthor = authorContext.authors.map((author) => {
        if (book.authorId.includes(author.id)) {
          return { ...author, bookId: [...new Set([...author.bookId, book.id])] };
        }
        return author;
      });

      updatedAuthor.forEach(authorContext.editAuthor);
    }

  };

  const editBook = (updatedBook: IBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));

    if (authorContext) {
      const updatedAuthor = authorContext.authors.map((author) => {
        if (updatedBook.authorId.includes(author.id)) {
          return { ...author, authorId: [...new Set([...author.bookId, updatedBook.id])] };
        } else {
          return { ...author, bookId: author.bookId.filter((id) => id !== updatedBook.id) };
        }
      });

      updatedAuthor.forEach(authorContext.editAuthor);
    }
  }

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));

    if (authorContext) {
      const updatedAuthor = authorContext.authors.map((author) => ({
        ...author,
        bookId: author.bookId.filter((bookId) => bookId !== id)
      }));

      updatedAuthor.forEach(authorContext.editAuthor);
    }
  };

  const getBookById = (id: string) => books.find((book) => book.id === id);

  return (
    <BookContext.Provider value={{ books, addBook, editBook, deleteBook, getBookById }}>
      {children}
    </BookContext.Provider>
  );
}