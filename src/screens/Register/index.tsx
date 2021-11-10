import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { Input } from '../../components/Forms/Input'
import { InputForm } from '../../components/Forms/InputForm';
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


interface FormData {
  name: string;
  amount: string;
}



export function Register() {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const[category, setCategory] = useState({
    key: 'category',
    name: 'categoria',

  })


  const { control, handleSubmit } = useForm()

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }
  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

    <Form>
      <Fields>
        <InputForm control={control} name="name" placeholder="Nome"/>
        <InputForm control={control} name="amount" placeholder="preço"/>
        <TransactionsTypes>
          <TransactionTypeButton type="up" title="income" onPress={() => handleTransactionTypeSelect('up')} isActive={transactionType === 'up'}  />
          <TransactionTypeButton type="down" title="outcome" onPress={() => handleTransactionTypeSelect('down')} isActive={transactionType === 'down'}  />
        </TransactionsTypes>
        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategory}  />
      </Fields>

      <Button title="Enviar" onPress={handleSubmit(handleRegister)}  />
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