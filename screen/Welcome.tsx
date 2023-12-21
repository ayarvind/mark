import { Button, Image, Pressable, StyleSheet, Text, View ,ImageSourcePropType} from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setStatusBar } from '../redux/actions'
import Colors from '../common/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { name as appName } from '../app.json'
import String from '../common/strings'
import Swiper from 'react-native-swiper'
import onBoarding from '../data/onBoarding'
import OnBoarding from '../interface/OnBoarding'
const Welcome = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        dispatch(setStatusBar({
            color: Colors.primary,
            style: 'dark-content'
        }))

    })

    return (
        <SafeAreaView style={styles.welcome}>
            <View style={styles.topView}>
                <Text style={styles.welcomeText}>{String.title(appName)}</Text>
                <Swiper
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={5}
                    dotColor={Colors.blueLight}
                    activeDotColor={Colors.blue}
                    style={{ marginTop: 20 }}
                >
                    {onBoarding.map((item:OnBoarding, index:number) => {
                        return (
                            <View key={index} style={{ 
                                flex: 1,
                                alignItems: 'left'
                                ,
                                }}>
                                <Image 
                                   source={item.image}
                                    objectFit="fill"
                                    style={{
                                        width: 300,
                                        height: 300,
                                        resizeMode: 'contain',
                                        marginBottom: 20

                                    }}
                                    
                                />
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: Colors.blueLight }}>{item.title}</Text>
                                <Text style={{ fontSize: 18, color: Colors.blueLight }}>{item.description}</Text>
                            </View>
                        )
                    })}

                </Swiper>

            </View>
            <View style={styles.bottomView}>
                <Pressable onPress={() => { navigation.navigate('Register' as never) }} style={styles.button}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('Login' as never) }} style={[styles.button, { marginTop: 10, backgroundColor: 'transparent' }]}>
                    <Text style={[styles.btnText, { color: Colors.blue }]}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    welcome: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 30

    },
    welcomeText: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.blueLight

    },
    button: {
        backgroundColor: Colors.blue,
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    topView: {
        flex: 4,
    },
    bottomView: {
        flex: 1,

    }
})