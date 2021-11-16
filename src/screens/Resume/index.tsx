import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { Container, Header, Title } from './styles';



export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      <HistoryCard title="compras" amount="1500" color="red" />
    </Container>
  )
}
