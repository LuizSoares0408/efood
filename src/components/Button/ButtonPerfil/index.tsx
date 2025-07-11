import { ButtonLink } from '../ButtonPerfil/styles'

type Props = {
  type: 'link'
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const ButtonCarrinho = ({ title, to, children, onClick }: Props) => {
  return (
    <ButtonLink to={to as string} title={title} type={'link'} onClick={onClick}>
      {children}
    </ButtonLink>
  )
}

export default ButtonCarrinho
