import React from 'react';


import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from './styles'


export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle"/>
      </Header>

      <Footer>
        <Amount>
          RS11111
        </Amount>
        <LastTransaction>
          Ultima entrada dia 111111 
        </LastTransaction>
      </Footer>
    </Container>
  )
}