// Context
import { useContextSelector } from 'use-context-selector'
import { TransactionsProvider } from '../contexts/TransactionContext'
// useMemo
import { useMemo } from 'react'

export function useSummary() {
  // Context
  const transactions = useContextSelector(TransactionsProvider, (context) => {
    return context.transactions
  })

  // Reducer
  // useMemo used to not reRender constantly
  const summary = useMemo(() => {
    return transactions.reduce(
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
  }, [transactions])

  return summary
}
