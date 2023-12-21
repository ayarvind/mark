import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FloatingActionButton from '../Widgets/FloatingActionButton'
import Icon from 'react-native-vector-icons/dist/AntDesign'
import { useNavigation } from '@react-navigation/native'
const HomePage = () => {
  const navigation = useNavigation<ReactNavigation>();
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>HomePage</Text>
      </View>
      <FloatingActionButton onPress={() => navigation.navigate('Scanner')} icon={'scan1'} />
    
    </>
  )
}

export default HomePage

const styles = StyleSheet.create({})