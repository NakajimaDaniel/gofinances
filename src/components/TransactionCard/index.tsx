
import React from 'react'
import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

export function TransactionCard() {
  return (
    <Container>
      <Title>Test </Title>
      <Amount>dasdasdas</Amount>
      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>asdasdasdasd</CategoryName>
        </Category>
        <Date>asdasdasdasd</Date>
      </Footer>
    </Container>
  )
}