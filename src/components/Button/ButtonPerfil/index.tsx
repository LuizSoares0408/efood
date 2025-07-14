import { ButtonLink } from '../ButtonPerfil/styles'

type Props = {
  type: 'link' | 'button'
  title: string
  to?: string
  onClick?: () => void
  children?: string
  className?: string
}

const ButtonCarrinho = ({ title, to, children, onClick, className }: Props) => {
  return (
    <ButtonLink to={to as string} title={title} type={'link'} onClick={onClick} className={className}>
      {children}
    </ButtonLink>
  )
}

export default ButtonCarrinho
