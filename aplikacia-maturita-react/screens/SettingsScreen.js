import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const SettingsScreen = () => {

  const navigation = useNavigation();

  const SignOut = () => {
    signOut(auth)
    .then(() =>{
      navigation.navigate("Top");
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <View>
      <TouchableOpacity
          onPress={SignOut}
          style={styles.button}
        >      
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
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
  }
})