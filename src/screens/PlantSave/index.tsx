import React, { useState } from 'react';

import {
  Alert,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/core';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { format, isBefore } from 'date-fns';
import { SvgFromUri } from 'react-native-svg';

import { PlantProps, savePlant } from '../../lib/storage';

import { Button } from '../../components/Button';

import { styles } from './styles';
import waterdrop from '../../assets/waterdrop.png';

interface Params {
  plant: PlantProps
}

export function PlantSave(){

  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(event: DateTimePickerEvent, dateTime: Date | undefined) {
    if(Platform.OS === 'android') {
      setShowDatePicker(old => !old);
    }

    if(dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰')
    }

    if(dateTime)
      setSelectedDateTime(dateTime)

  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(old => !old)
  }

  async function handleSavePlant() {
    try {
      await savePlant ({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique traquilo que sempre vamos lembrar você de cuidar da sua plantinha .',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch {
        Alert.alert('Não foi possível salvar! 🥲');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
            <View style={styles.tipContainer}>
              <Image
                source={waterdrop}
                style={styles.tipImage}
              />

              <Text style={styles.tipText}>
                  {plant.water_tips}
              </Text>
            </View>

            <Text style={styles.alertLabel}>
              Escolha o melhor horário para ser lembrado:
            </Text>

            {showDatePicker &&  (
              <DateTimePicker
                value={selectedDateTime}
                mode={'time'}
                display={Platform.OS === 'android' ? 'default' : 'spinner'}
                onChange={handleChangeTime}
              />
            )}

            {Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text style={styles.dateTimePickerText}>
                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )}

            <Button
              title='Cadastrar planta'
              onPress={handleSavePlant}
            />
        </View>
      </View>
    </ScrollView>
  );
}
