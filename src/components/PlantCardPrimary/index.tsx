import React from 'react';

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import { SvgFromUri } from 'react-native-svg';

interface PlantProps extends TouchableOpacityProps {
  data: {
    name: string;
    photo: string;
  }
}

import { styles } from './styles';

export function PlantCardPrimary({data, ...rest}: PlantProps){
  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >
      <SvgFromUri
        uri={ data.photo }
        width={70}
        height={70}
      />

      <Text
        style={styles.text}
      >
        {data.name}
      </Text>

    </TouchableOpacity>
  );
}
