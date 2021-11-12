import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { Input } from '../../components/Forms/Input'
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,

 } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError("Informe um valor numerico")
  .positive("o valor nao pode ser negativo")
  .required('obrigatorio')
})

export function Register() {

  const dataKey = '@gofinances:transactions';
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const[category, setCategory] = useState({
    key: 'category',
    name: 'categoria',

  })


  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
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

  async function handleRegister(form: FormData) {

    if (!transactionType) { return Alert.alert("selecione o tipo da transacao")};
    if(category.key === 'category') { return Alert.alert("selecione a categoria")};


    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }

    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify(data));

    }catch (error) {
      console.log(error);
      Alert.alert("não foi possivel salvar");
    }
  }


  useEffect(() => {
    async function GetData() {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!))
    }
    GetData();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
    <Container>
      
      <Header>
        <Title>Cadastro</Title>
      </Header>

    <Form>
      <Fields>
        <InputForm control={control} name="name" placeholder="Nome" autoCapitalize="sentences" autoCorrect={false}  error={errors.name && errors.name.message} />
        <InputForm control={control} name="amount" placeholder="preço" keyboardType="numeric" error={errors.amount && errors.amount.message}  />
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
    </TouchableWithoutFeedback>
  ) 
}