import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text
        style={styles.text}
        {...rest}
      >
          {title}
      </Text>
    </TouchableOpacity>
  );
}
