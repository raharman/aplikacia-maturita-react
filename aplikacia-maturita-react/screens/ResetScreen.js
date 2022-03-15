import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from "firebase/auth";

const ResetScreen = () => {

  const [email, setEmail] = useState('')

  const ResetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {})
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={ResetPassword}
            style={[styles.button, styles.buttonOutline]} 
          >
            <Text style={styles.buttonOutlineText}>Reset</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default ResetScreen

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