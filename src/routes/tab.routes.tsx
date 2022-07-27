import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';

import { PlantSelect } from '../screens/PlantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../screens/MyPlants';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.heading,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ?  20 : 0,
          height: Platform.OS === 'ios' ?  88 : 68,
        }
      }}
    >

      <Screen
        name='Nova Planta'
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name='add-circle-outline'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name='Minha Plantas'
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ))
        }}
      />

    </Navigator>
  )
}
