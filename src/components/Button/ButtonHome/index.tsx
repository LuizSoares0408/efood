import { ButtonLink } from '../ButtonHome/styles'

type Props = {
  type: 'link'
  title: string
  to?: string
  onClick?: () => void
  children: string
}

const Button = ({ title, to, children }: Props) => {
  return (
    <ButtonLink to={to as string} title={title}>
      {children}
    </ButtonLink>
  )
}

export default Button
