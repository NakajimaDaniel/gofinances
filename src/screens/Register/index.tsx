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
import uuid from 'react-native-uuid'


import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,

 } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';


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


  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const[category, setCategory] = useState({
    key: 'category',
    name: 'categoria',

  })

  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
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


    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'categoria',
      });

      navigation.navigate('Listagem');

    }catch (error) {
      console.log(error);
      Alert.alert("não foi possivel salvar");
    }
  }



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
          <TransactionTypeButton type="up" title="income" onPress={() => handleTransactionTypeSelect('positive')} isActive={transactionType === 'positive'}  />
          <TransactionTypeButton type="down" title="outcome" onPress={() => handleTransactionTypeSelect('negative')} isActive={transactionType === 'negative'}  />
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