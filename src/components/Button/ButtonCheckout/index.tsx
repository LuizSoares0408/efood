import { ButtonLink } from './styles' // Sua '<a>' estilizada
import { ButtonElement } from './styles' // <--- VOCÊ PRECISA CRIAR ESTE, que será seu <button> estilizado

type Props = {
  type?: 'link' | 'button' | 'submit' // 'type' pode ser opcional para 'link'
  title: string
  to?: string // 'to' é relevante apenas para type='link'
  onClick?: () => void
  children?: React.ReactNode // Use React.ReactNode para ser mais flexível
  className?: string
}

const ButtonCheck = ({
  title,
  to,
  children,
  onClick,
  className,
  type = 'button'
}: Props) => {
  // Se o tipo for 'link' e 'to' for fornecido, renderize como um link
  if (type === 'link' && to) {
    return (
      <ButtonLink to={to} title={title} onClick={onClick} className={className}>
        {children}
      </ButtonLink>
    )
  }

  // Caso contrário (se type for 'button' ou 'submit'), renderize como um botão
  // E passe o 'type' para o elemento <button> nativo
  return (
    <ButtonElement // <--- AGORA ESTE É UM COMPONENTE DE <button> ESTILIZADO
      type={type === 'submit' ? 'submit' : 'button'} // Garante que o type correto seja passado para o HTML
      title={title}
      onClick={onClick}
      className={className}
    >
      {children}
    </ButtonElement>
  )
}

export default ButtonCheck
