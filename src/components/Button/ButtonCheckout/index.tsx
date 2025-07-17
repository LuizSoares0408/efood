import { ButtonLink } from './styles'

type Props = {
  type: 'link' | 'button' | 'submit'
  title: string
  to?: string
  onClick?: () => void
  children?: string
  className?: string
}

const ButtonCheck = ({ title, to, children, onClick, className }: Props) => {
  return (
    <ButtonLink
      to={to as string}
      title={title}
      type={'link'}
      onClick={onClick}
      className={className}
    >
      {children}
    </ButtonLink>
  )
}

export default ButtonCheck
