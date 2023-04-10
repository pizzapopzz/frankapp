import { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function jumpertext() {
  const [fontsLoaded] = useFonts({
    'Jumper': require('./../assets/fonts/jumper/JumperPERSONALUSEONLY-BoldItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text style={{ fontFamily: 'Jumper', fontSize: 30 }}>Jumper</Text>
      <Text style={{ fontSize: 30 }}>Platform Default</Text>
    </View>
  );
}