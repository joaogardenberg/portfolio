import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Providers from 'providers'
import Routes from 'components/Routes'
import GlobalStyles from './index.global.styled'
import reportWebVitals from './reportWebVitals'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Providers>
      <GlobalStyles />
      <Routes />
    </Providers>
  </StrictMode>
)

reportWebVitals()
