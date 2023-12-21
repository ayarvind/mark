import { StyleSheet, Text, View ,Image, Alert} from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View style={styles.splash}>
        <Image style={styles.images} source={require('../assets/images/mark.png')} />
        <Text style={styles.welcome}>Please Wait..</Text>
    </View>
   
  )
}

export default Splash

const styles = StyleSheet.create({
    splash:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
    },
    welcome:{
        fontSize:15,
        fontWeight:'bold',
        color:'#000',
        marginTop:15
    },
    images:{
        width:200,
        height:70,

    }
})