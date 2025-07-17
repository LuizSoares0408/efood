import fundo from '../../assets/images/fundo.png'
import logo from '../../assets/images/logo.png'
import { ContainerHeader, HeaderContent, Logo, Titulo } from './styles'

const Hero = () => (
  <ContainerHeader backgroundImage={fundo}>
    <HeaderContent>
      <Logo src={logo} alt="logo" />
      <Titulo>Viva experiências gastronômicas no conforto da sua casa</Titulo>
    </HeaderContent>
  </ContainerHeader>
)

export default Hero
