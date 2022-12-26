import { ThemeProvider } from 'styled-components'
import { TransactionContext } from './contexts/TransactionContext'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/defaultTheme'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionContext>
        <Transactions />
      </TransactionContext>
      <GlobalStyle />
    </ThemeProvider>
  )
}
