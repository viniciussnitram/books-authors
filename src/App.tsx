import { useContext } from "react";
import { IsBookSelectedContext } from "./app/contexts/IsBookSelectedContext";
import { GlobalStyle, Main, Tab } from "./global";
import Authors from "./views/components/ui/Authors/Authors";
import Books from "./views/components/ui/Books/Books";

function App() {
  const isBookSelectedContext = useContext(IsBookSelectedContext);

  if (!isBookSelectedContext) return <p>Carregando...</p>
  const { isBookSelected, setIsBookSelected } = isBookSelectedContext;

  return (
    <>
      <GlobalStyle />

      <Main>
        <h1>Consultando {isBookSelected ? 'livros' : 'autores(as)'}</h1>

        <Tab>
          <button
            className={!isBookSelected ? 'active' : ''}
            onClick={() => setIsBookSelected(true)}
          >
            Livros
          </button>

          <button
            className={isBookSelected ? 'active' : ''}
            onClick={() => setIsBookSelected(false)}
          >
            Autores(as)
          </button>
        </Tab>

        {isBookSelected ? (
          <Books />
        ) : (
          <Authors />
        )}
      </Main>
    </>
  );
}

export default App;
