// Components
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'

// CSS
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

// Axios
import axios from 'axios'
import { useEffect, useState } from 'react'

// Interface
interface ITransactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const loadTransactions = async () => {
    const trans = await axios
      .get('http://localhost:3000/transactions')
      .then((res) => res.data)

    setTransactions(trans)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

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
                      R$ {t.price}
                    </PriceHighlight>
                  </td>
                  <td>{t.category}</td>
                  <td>{t.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
