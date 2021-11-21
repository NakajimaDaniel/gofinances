import React, { useContext } from 'react';
import { Container, Title, TitleWrapper, Header, SignInTitle, Footer, FooterWrapper } from './styles';

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';



export function SignIn() {

  const { user } = useAuth();


  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas {'\n'} finanças de forma {'\n'} muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}