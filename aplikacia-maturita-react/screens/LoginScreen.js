import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  /*
  const SignUp = () => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=>{
      setIsSignedIn(true);
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  */

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{

     })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <View style={styles.inputContainer}>
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            />   
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={SignIn}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[styles.button, styles.buttonOutline]} 
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Reset')}
            style={[styles.button, styles.buttonOutline]} 
          >
            <Text style={styles.buttonOutlineText}>Reset</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer:{
      width: '80%'
    },

    input:{
      	backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer:{
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },

    button:{
      backgroundColor: 'gray',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },

    buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },

    buttonOutline:{
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: 'gray',
      borderWidth: 2,
    },

    buttonOutlineText:{
      color: 'gray',
      fontWeight: '700',
      fontSize: 16,
    },
})