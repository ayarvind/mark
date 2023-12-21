import { StyleSheet } from "react-native";
import Colors from "../common/colors";
export default StyleSheet.create({
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
  })