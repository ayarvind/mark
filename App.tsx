import React, { useEffect, useState } from 'react';
import { StatusBar, StatusBarProps, StyleSheet, View } from 'react-native';
import Splash from './components/Splash';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './Stack';
import Colors from './common/colors';
import { useSelector } from 'react-redux';

export default function App(navigation: any) {
  const [splash, setSplash] = useState<boolean>(true);
  const statusBar = useSelector((state:any) => state.statusBar);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={statusBar.color} barStyle={statusBar.style} />
      {splash ? <Splash /> : (
        <>
          <NavigationContainer>
            <Stack />
          </NavigationContainer>
        
        </>

      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgApp,
  }
});
