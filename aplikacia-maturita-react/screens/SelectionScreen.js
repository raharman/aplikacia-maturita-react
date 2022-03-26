import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'

const SelectionScreen = ({ route, navigation }) => {

  const {title} = route.params;

  useEffect(() => {

    navigation.setOptions({
      title: title,
    }); 
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default SelectionScreen

const styles = StyleSheet.create({})