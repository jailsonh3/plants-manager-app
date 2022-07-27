import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Alert,
    Keyboard
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { Button } from '../../components/Button';

export function UserIdentification() {

  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>()

  function handleInputBlur () {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  async function handleSubmit() {
    if(!name)
      return Alert.alert('Atenção', 'Me diz como chamar você 🙃');

      try {
        await AsyncStorage.setItem('@plantmanager:user', name);
        navigation.navigate('Confirmation', {
          title: 'Prontinho',
          subtitle: 'Agora vamos comerçar a cuidar das suas plantinhas com muito cuidado.',
          buttonTitle: 'Começar',
          icon: 'smile',
          nextScreen: 'PlantSelect'
        });
      } catch {
         Alert.alert('Error!', 'Não foi possível salvar o nome do usuário. 🥲');
      }
  }

  return (
    <View style={styles.content}>
        <KeyboardAvoidingView
            style={styles.content}
            behavior={Platform.OS === 'ios'? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
              <View style={styles.form}>
                  <View style={styles.header}>
                      <Text style={styles.emoji}>
                          { isFilled ? '😄': '😀' }
                      </Text>

                      <Text style={styles.title}>
                          Como podemos {'\n'}
                          chamar você?
                      </Text>
                  </View>

                  <TextInput
                      style={[
                        styles.input,
                        (isFocused || isFilled)
                          && styles.isFocused
                      ]}
                      placeholder="Digite um nome"
                      onBlur={handleInputBlur}
                      onFocus={handleInputFocus}
                      onChangeText={handleInputChange}
                  />

                  <View style={styles.footer}>
                      <Button
                        title='Confirmar'
                        onPress={handleSubmit}
                      />
                  </View>
              </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </View>
  );
}
