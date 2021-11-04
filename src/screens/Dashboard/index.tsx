

import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'


import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title } from './styles'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/59265044?v=4' }} />
          <User>
            <UserGreeting>
              Olá
            </UserGreeting>
            <UserName>Test</UserName>
          </User>
        </UserInfo>
        <Icon name="power" /> 
        </UserWrapper>
      </Header> 
      <HighlightCards>
        <HighlightCard title="Entradas" amount="dasdasdasd" lastTransaction="dasdasdasd" type="up" />
        <HighlightCard title="Entradas" amount="dasdasdasd" lastTransaction="dasdasdasd" type="total" />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionCard />
      </Transactions>
    </Container>
  )
}