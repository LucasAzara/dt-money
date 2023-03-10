// Radix UI
import * as Dialog from '@radix-ui/react-dialog'
// Icons
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
// CSS
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
// Zod & React Form Hook
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// Context
import { TransactionsProvider } from '../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'

// Zod Schema
const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

// interface/type
type TTransactionFormSchema = z.infer<typeof newTransactionFormSchema>

interface INewTransactionModal {
  handleSetDialogStatus: (state: boolean) => void
}

export function NewTransactionModal({
  handleSetDialogStatus,
}: INewTransactionModal) {
  const createTransaction = useContextSelector(
    TransactionsProvider,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TTransactionFormSchema>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: TTransactionFormSchema) {
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    // After creation reset form and close dialog
    await createTransaction(data)
      .then(() => reset())
      .then(() => handleSetDialogStatus(false))
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          {/* Controller, Wrapper Components for Controlled Inputs */}
          <Controller
            // method for registering components
            control={control}
            name="type"
            // field, from props that hold the information for the inputs
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange} // Send value to hook form
                  value={field.value} // controlled value of the radio item
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
