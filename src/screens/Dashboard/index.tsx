

import React from 'react'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'


import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionsList} from './styles'

export function Dashboard() {

  const data = [{
    title:"listagem" ,
    amount:"333333" ,
    category:{name: 'veda', icon: 'dollar-sign'} ,
    date:"222222",
  },
  {
    title:"listagem" ,
    amount:"333333" ,
    category:{name: 'veda', icon: 'dollar-sign'} ,
    date:"222222",
  },
  {
    title:"listagem" ,
    amount:"333333" ,
    category:{name: 'veda', icon: 'dollar-sign'} ,
    date:"222222",
  },

]

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
        <TransactionsList 
        data={data} 
        renderItem={({item}) => <TransactionCard  data={item} />}   
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: getBottomSpace()
        }}
        /> 
        
      </Transactions>
    </Container>
  )
}