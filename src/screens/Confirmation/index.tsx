import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../components/Button';

import { styles } from './styles';

export interface ConfirmationParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export function Confirmation(){

  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    icon,
    buttonTitle,
    nextScreen
  } = routes.params as ConfirmationParams;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }

  return (
    <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
            {title}
        </Text>

        <Text style={styles.subtitle}>
            {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button
            title={buttonTitle}
            onPress={handleMoveOn}
          />
        </View>
    </View>
  );
}
