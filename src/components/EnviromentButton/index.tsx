import React from 'react';

import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

interface EnviromeentButtonProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

import { styles } from './styles';

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: EnviromeentButtonProps){
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive
      ]}>
          {title}
      </Text>
    </TouchableOpacity>
  );
}
