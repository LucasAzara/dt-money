// CSS
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
// Logo
import logoImg from '../../assets/logo.svg'
//  Radix
import * as Dialog from '@radix-ui/react-dialog'
// Components
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {/* Trigger to Activate Dialog (asChild refering to utilize the child) */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          {/* Dialog Content */}
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
