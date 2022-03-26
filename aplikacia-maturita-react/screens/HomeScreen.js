import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = props => {

  const navigation = useNavigation();

  return (

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Selection",{title: 'Gramatika',})}
        style={styles.button}
      >
        <Ionicons name="pencil" size={24} color="white" style={styles.icon}/>
        <Text
          style={styles.buttonText}
        >
          Gramatika
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Selection",{title: 'Literatúra',})}
        style={styles.button}
      >
        <Ionicons name="book" size={24} color="white" style={[styles.icon, {backgroundColor: '#EE8695'}]}/>
        <Text
          style={styles.buttonText}
        >
          Literatúra
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Selection",{title: 'Kvízy',})}
        style={styles.button}
      >
        <Ionicons name="help" size={24} color="white" style={[styles.icon, {backgroundColor: '#FBBBAD'}]}/>
        <Text
          style={styles.buttonText}
        >
          Kvíz
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  buttonContainer:{
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  button:{
    flexDirection: "row",
    alignItems: "center",
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
  },
  icon:{
    width: '44px',
    backgroundColor: '#333f58',
    borderRadius: 10,
    padding: '10px',
    marginRight: '10px',
  },
})