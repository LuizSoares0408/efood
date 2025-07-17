import styled from 'styled-components'
import { cores } from '../styles'

export const FooterContainer = styled.div<{ backgroundImage: string }>`
  width: 100%;
  min-height: 384px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1024px;
  padding: 0 16px;
  text-align: center;
`

export const Logo = styled.img`
  height: 57px;
  width: 125px;
  margin-bottom: 32.5px;
`

export const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 80px;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`
export const DisclaimerText = styled.p`
  font-size: 10px;
  color: ${cores.vermelho};
  text-align: center;
  width: 100%;
  max-width: 480px;
`
