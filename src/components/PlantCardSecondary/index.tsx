import { Feather } from '@expo/vector-icons';
import React from 'react';

import {
  Animated,
  Text,
  View
} from 'react-native';

import {
  RectButton,
  RectButtonProps,
  GestureHandlerRootView,
  Swipeable
} from 'react-native-gesture-handler';

import { SvgFromUri } from 'react-native-svg';
import colors from '../../styles/colors';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  },
  handleRemove: () => void;
}

import { styles } from './styles';

export function PlantCardSecondary({data, handleRemove, ...rest}: PlantProps){
  return (
    <GestureHandlerRootView>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View>
            <View>
              <RectButton
                style={styles.buttonRemove}
                onPress={handleRemove}
              >
                  <Feather name='trash' size={32} color={colors.white} />
              </RectButton>
            </View>
          </Animated.View>
        )}
      >
        <RectButton
          style={styles.container}
          {...rest}
        >
          <SvgFromUri
            uri={ data.photo }
            width={50}
            height={50}
          />

          <Text
            style={styles.title}
          >
            {data.name}
          </Text>

          <View style={styles.details}>
            <Text style={styles.timeLabel}>
              Regar às
            </Text>
            <Text style={styles.time}>
              {data.hour}
            </Text>
          </View>

        </RectButton>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
