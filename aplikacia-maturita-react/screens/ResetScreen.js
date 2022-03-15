import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ResetScreen = () => {
  return (
    <View>
        
    </View>
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

    buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
})