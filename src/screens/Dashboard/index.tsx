

import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard,TransactionCardProps } from '../../components/TransactionCard'


import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionsList, LogoutButton} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}


export function Dashboard() {


  const [data, setData] = useState<DataListProps[]>([]);

   
  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = await transactions.map( (item: DataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category, 
        date,
      }

    })

    setData(transactionsFormatted);

  }


  useEffect(() => {
   loadTransactions();

  }, [])

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