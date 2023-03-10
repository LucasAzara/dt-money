// Icon
import { MagnifyingGlass } from 'phosphor-react'
// CSS
import { SearchFormContainer } from './styles'
// Zod & React Form Hook
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Context
import { TransactionsProvider } from '../../../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'

// Zod Schema
const searchFormSchema = z.object({
  query: z.string(),
})

// Zod type
type TSearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsProvider,
    (context) => {
      return context.fetchTransactions
    },
  )

  // React Hook Form & Zod Verification and Submit function
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  // Action on Submit
  async function handleSearchTransactions(data: TSearchFormInputs) {
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
