// React
import { createContext, ReactNode, useState, useEffect } from 'react'
// Axios
import axios from 'axios'

// Interface
interface ITransactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export interface ITransactionsProviderContext {
  transactions: ITransactions[]
}

interface ITransactionsProviderProps {
  children: ReactNode
}

export const TransactionsProvider = createContext(
  {} as ITransactionsProviderContext,
)

export function TransactionContext({ children }: ITransactionsProviderProps) {
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
    <TransactionsProvider.Provider value={{ transactions }}>
      {children}
    </TransactionsProvider.Provider>
  )
}
