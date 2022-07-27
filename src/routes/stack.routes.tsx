import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from "../styles/colors";

import { Welcome } from "../screens/Welcome";
import { UserIdentification } from "../screens/UserIdentification";
import { Confirmation } from "../screens/Confirmation";
import { PlantSave } from "../screens/PlantSave";
import { AuthRoutes } from "./tab.routes";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
      <Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          statusBarColor: colors.background,
          statusBarStyle: 'dark'
        }}
      >
         <Screen name="Welcome" component={Welcome} />
         <Screen name="UserIdentification" component={UserIdentification} />
         <Screen name="Confirmation" component={Confirmation} />
         <Screen name="PlantSelect" component={AuthRoutes}/>
         <Screen name="PlantSave" component={PlantSave}/>
         <Screen name="MyPlants" component={AuthRoutes}/>
      </Navigator>
  )
}
