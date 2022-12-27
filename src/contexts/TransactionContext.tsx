// React
import { createContext, ReactNode, useState, useEffect } from 'react'
// Axios
import axios from 'axios'
import { api } from '../lib/axios'

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
  fetchTransactions: (query?: string) => Promise<void>
}

interface ITransactionsProviderProps {
  children: ReactNode
}

export const TransactionsProvider = createContext(
  {} as ITransactionsProviderContext,
)

export function TransactionContext({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  // Get transactions form JSON Server
  const fetchTransactions = async (query?: string) => {
    const trans = await api.get('/transactions', {
      params: { q: query },
    })

    setTransactions(trans.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsProvider.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsProvider.Provider>
  )
}
