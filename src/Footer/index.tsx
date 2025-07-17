import fundo from '../assets/images/fundo.png'
import logo from '../assets/images/logo.png'
import instagram from '../assets/images/instagram.png'
import facebook from '../assets/images/facebook.png'
import twitter from '../assets/images/twitter.png'

import {
  FooterContainer,
  FooterContent,
  Logo,
  SocialMediaIcons,
  DisclaimerText
} from './styles'

const Footer = () => (
  <FooterContainer backgroundImage={fundo}>
    <FooterContent>
      <Logo src={logo} alt="efood logo" />
      <SocialMediaIcons>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="Link para o perfil do Instagram" />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook} alt="Link para o perfil do Facebook" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter} alt="Link para o perfil do Twitter" />
        </a>
      </SocialMediaIcons>
      <DisclaimerText>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </DisclaimerText>
    </FooterContent>
  </FooterContainer>
)

export default Footer
