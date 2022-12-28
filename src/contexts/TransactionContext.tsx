// React
import { ReactNode, useState, useEffect } from 'react'
import { createContext } from 'use-context-selector'
// Axios
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

interface INewTransaction {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface ITransactionsProviderContext {
  transactions: ITransactions[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: INewTransaction) => Promise<void>
}

interface ITransactionsProviderProps {
  children: ReactNode
}

// Context Selector Create Context
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

  // Create new transaction and Update JSON Server
  const createTransaction = async (data: INewTransaction) => {
    const { category, description, price, type } = data

    const response = await api.post('/transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date().toISOString(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsProvider.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsProvider.Provider>
  )
}
