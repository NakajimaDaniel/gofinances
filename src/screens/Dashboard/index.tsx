

import React from 'react'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard,TransactionCardProps } from '../../components/TransactionCard'


import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionsList, LogoutButton} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}


export function Dashboard() {

  const data: DataListProps[] = [{
    id: '1',
    type: 'positive',
    title:"listagem" ,
    amount:"333333" ,
    category:{name: 'veda', icon: 'dollar-sign'} ,
    date:"222222",
  },
  {
    id: '2',
    type: 'negative',
    title:"listagem" ,
    amount:"333333" ,
    category:{name: 'veda', icon: 'dollar-sign'} ,
    date:"222222",
  },
  {
    id: '3',
    type: 'negative',
    title:"listagem" ,
    amount:"333333" ,
    category:{name: 'veda', icon: 'coffee'} ,
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
        <LogoutButton onPress={() => {}}>
          <Icon name="power" /> 
        </LogoutButton>
        
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
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard  data={item} />}   

        /> 
        
      </Transactions>
    </Container>
  )
}