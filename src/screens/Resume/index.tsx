import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content } from './styles';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter((expenses:TransactionData) => expenses.type === 'negative');

    const totalByCategory:CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense:TransactionData) => {
        if(expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      })

      if(categorySum) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: total,
          color: category.color
        })
      }

    })
    setTotalByCategories(totalByCategory);
  }


  useEffect(() => {
    loadData();
  },[])

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <Content>
        {totalByCategories.map(item => (
          <HistoryCard key={item.key}  title={item.name} amount={item.total} color={item.color} />
        ))}
      </Content>
    </Container>
  )
}
