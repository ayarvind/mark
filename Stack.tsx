import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './screen/Main'
import QRCodeScannerScreen from './components/Scanner'
import LoginScreen from './screen/Login'
import RegisterScreen from './screen/Register'
import Welcome from './screen/Welcome'

const Navigation = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
    initialRouteName='Welcome'
    screenOptions={{
        headerShown:false,
    }}>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen name='Scanner' component={QRCodeScannerScreen}/>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Register' component={RegisterScreen}/>

    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})