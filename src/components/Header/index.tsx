// CSS
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
// Logo
import logoImg from '../../assets/logo.svg'
//  Radix
import * as Dialog from '@radix-ui/react-dialog'
// Components
import { NewTransactionModal } from '../NewTransactionModal'
import { useCallback, useState } from 'react'

export function Header() {
  const [dialogStatus, setDialogStatus] = useState(false)

  const handleSetDialogStatus = useCallback((state: boolean) => {
    setDialogStatus(state)
  }, [])

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={dialogStatus} onOpenChange={setDialogStatus}>
          {/* Trigger to Activate Dialog (asChild refering to utilize the child) */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          {/* Dialog Content */}
          <NewTransactionModal handleSetDialogStatus={handleSetDialogStatus} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
