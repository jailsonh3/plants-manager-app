import React from 'react';

import {
  View
} from 'react-native';

import LottieView from 'lottie-react-native';

import { styles } from './styles';

export function Load(){

  return (
    <View style={styles.container}>
      <LottieView
        source={require('./../../assets/load.json')}
        style={styles.animation}
        autoPlay
        loop
      />
    </View>
  );
}
