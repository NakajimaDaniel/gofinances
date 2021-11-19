import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, SelectIcon, Month } from './styles';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'


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
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  function handleChangeDate(action: 'next' | 'prev') {
    if(action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter((expenses:TransactionData) => 
    
      expenses.type === 'negative' &&
      new Date(expenses.date).getMonth() === selectedDate.getMonth() &&
      new Date(expenses.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensesTotal = expenses.reduce((acc: number, expenseTotal: TransactionData) => {
      return acc + Number(expenseTotal.amount);
    }, 0)

    const totalByCategory:CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense:TransactionData) => {
        if(expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      })

      if(categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent,
        })
      }

    })
    setTotalByCategories(totalByCategory);
  }


  useEffect(() => {
    loadData();
  },[selectedDate])

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      <Content  
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleChangeDate('prev')}>
            <SelectIcon name="chevron-left"  />
          </MonthSelectButton>

          <Month>
            { format(selectedDate, "MMMM,yyyy", {locale: ptBR} ) }
          </Month>

          <MonthSelectButton onPress={() => handleChangeDate('next')}>
            <SelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie data={totalByCategories} x="percent" y="total" colorScale={totalByCategories.map(category => category.color)}  style={{ labels: { fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape   }}} labelRadius={50} />
        </ChartContainer>
        {totalByCategories.map(item => (
          <HistoryCard key={item.key}  title={item.name} amount={item.totalFormatted} color={item.color} />
        ))}
      </Content>
    </Container>
  )
}
