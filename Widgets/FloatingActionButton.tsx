import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Colors from '../common/colors';
interface Props {
    onPress: () => void;
    text?: string;
    icon?: string;
    style?: object;
    iconSize?: number,

}
const FloatingActionButton = (props: Props) => {
    return (
        <>
            <TouchableOpacity touchSoundDisabled={false} onPress={props.onPress} style={[styles.fab, props.style]}>
                {/* <Text>{props.text}</Text> */}
                <Icon color={'white'} name={props.icon} size={(props.iconSize) ? props.iconSize : 20} />
            </TouchableOpacity>
        </>
    )
}

export default FloatingActionButton

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        color:'white',
        backgroundColor:Colors.primary,
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation: 8,
        bottom: 30,
        right: 10,
        textAlign:'center',

    }
})