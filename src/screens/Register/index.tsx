import React, { useState } from 'react'
import { Modal } from 'react-native';
import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { Input } from '../../components/Forms/Input'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,

 } from './styles'



export function Register() {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const[category, setCategory] = useState({
    key: 'category',
    name: 'categoria',

  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }
  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

    <Form>
      <Fields>
        <Input placeholder="Nome"/>
        <Input placeholder="preço"/>
        <TransactionsTypes>
          <TransactionTypeButton type="up" title="income" onPress={() => handleTransactionTypeSelect('up')} isActive={transactionType === 'up'}  />
          <TransactionTypeButton type="down" title="outcome" onPress={() => handleTransactionTypeSelect('down')} isActive={transactionType === 'down'}  />
        </TransactionsTypes>
        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategory}  />
      </Fields>

      <Button title="Enviar" />
    </Form>

    <Modal visible={categoryModalOpen}>
      <CategorySelect 
        category = {category}
        setCategory = {setCategory}
        closeSelectCategory={handleCloseSelectCategory}
      />
    </Modal>

    </Container>
  ) 
}