import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../common/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { actionName } from '../redux/actionName';
import { setStatusBar } from '../redux/actions';
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatusBar({
      color: 'white',
      style: 'dark-content'
    }))

  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/login.jpg')} style={styles.headerImage} />
      <View style={styles.form}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subheading}>Login to continue 😊</Text>
        <TextInput placeholder='Enter phone number' style={styles.inputs} />
        <TextInput placeholder='Enter password' secureTextEntry={true} style={styles.inputs} />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <Text style={styles.dha}>Don't have account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register' as never)}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        {/* <Image source={require('../assets/images/mark.png')} style={styles.logo} /> */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  form: {
    width: '100%',
    // alignItems: 'center',
    marginTop: 30, // Adjust this value as needed
    padding: 20,
  },
  logo: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  dha: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#3a3a3a',
  },
  subheading: {
    fontSize: 16,
    marginBottom: 25,
    color: '#3a3a3a',
  },
  heading: {
    fontSize: 30,
    color: '#3a3a3a',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  inputs: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderColor: 'transparent',
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 18,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    height: 20,
  },
  registerButton: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
    color: Colors.primary,
  },
  registerButtonText: {
    color: 'dodgerblue',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
