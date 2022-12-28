// Components
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
// Context
import { useContextSelector } from 'use-context-selector'
import { TransactionsProvider } from '../../contexts/TransactionContext'
// React Hook Form
import { SearchForm } from './components/SearchForm'
// Formatters
import { dateFormatter, priceFormatter } from '../../utils/formatter'

// CSS
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsProvider, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((t) => {
              return (
                <tr key={t.id}>
                  <td width="50%">{t.description}</td>
                  <td>
                    <PriceHighlight variant={t.type}>
                      {priceFormatter.format(t.price)}
                    </PriceHighlight>
                  </td>
                  <td>{t.category}</td>
                  <td>{dateFormatter.format(new Date(t.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
