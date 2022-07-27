import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView
} from "react-native";

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import {
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'

import Routes from './src/routes';

SplashScreen.preventAutoHideAsync();

export default function App () {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({Jost_400Regular, Jost_600SemiBold});

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView
      style={{flex: 1}}
      onLayout={onLayoutRootView}
    >
      <Routes />
    </SafeAreaView>
  )
}

