import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { signOut } from "firebase/auth";

const HomeScreen = () => {

  const navigation = useNavigation()

  const SignOut = () => {
    signOut(auth)
    .then(() =>{
      navigation.replace("Login")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={SignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button:{
    backgroundColor: 'gray',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },

  buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})