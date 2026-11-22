import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/manrope/wght.css'
import './styles/index.css'
import App from './App'
createRoot(document.getElementById('root')!).render(<BrowserRouter><App/></BrowserRouter>)
