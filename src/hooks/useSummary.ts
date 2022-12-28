import { useContextSelector } from 'use-context-selector'
import { TransactionsProvider } from '../contexts/TransactionContext'

export function useSummary() {
  // Context
  const transactions = useContextSelector(TransactionsProvider, (context) => {
    return context.transactions
  })

  // Reducer
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcome += transaction.price
        acc.total -= transaction.price
      }

      return acc
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  )

  return summary
}
