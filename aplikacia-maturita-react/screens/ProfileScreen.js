import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'

const ProfileScreen = () => {

  const SignOut = () => {
    auth
    .signOut()
    .then(() =>{})
    .catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={SignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Odhlásiť sa
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  buttonContainer:{
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  button:{
    backgroundColor: '#E1E1E1',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: '20px',
  },
  buttonText:{
    color: '#3C3C44',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
})