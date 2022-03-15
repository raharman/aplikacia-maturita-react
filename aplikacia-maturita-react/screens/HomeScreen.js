import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { signOut } from "firebase/auth";
import { collection, getDocs } from 'firebase/firestore';

const HomeScreen = () => {

  const navigation = useNavigation();

  const [topics, setTopics] = useState([]);
  const topicsCollectionRef = collection(db, "topics");

  useEffect(() => {
    
    const getTopics = async () => {
      const data = await getDocs(topicsCollectionRef);
      setTopics(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTopics();
  }, []);

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
      <View>
      {topics.map((topic) => { 
          return(
            <Text key={topic.id}>
              <h1>Meno: {topic.name}</h1>
              <p>Text: {topic.text}</p>
              <p>Typ: {topic.type}</p>
              <p>Id: {topic.id}</p>
            </Text>
          );
        })}
      </View>
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