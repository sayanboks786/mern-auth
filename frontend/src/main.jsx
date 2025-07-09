// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(

    <ChakraProvider>
      <BrowserRouter>
      <AppContextProvider>
         <App />
      </AppContextProvider>
      </BrowserRouter>
    </ChakraProvider>,
)
