import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthorProvider } from './app/contexts/AuthorContext.tsx'
import { BookProvider } from './app/contexts/BookContext.tsx'
import { IsBookSelectedProvider } from './app/contexts/IsBookSelectedContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IsBookSelectedProvider>
      <BookProvider>
        <AuthorProvider>
          <App />
        </AuthorProvider>
      </BookProvider>
    </IsBookSelectedProvider>
  </StrictMode>
)
