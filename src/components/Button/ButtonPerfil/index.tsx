import { ButtonLink } from '../ButtonPerfil/styles'

type Props = {
  type: 'link'
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const ButtonCarrinho = ({ title, to, children }: Props) => {
  return (
    <ButtonLink to={to as string} title={title} type={'link'}>
      {children}
    </ButtonLink>
  )
}

export default ButtonCarrinho
