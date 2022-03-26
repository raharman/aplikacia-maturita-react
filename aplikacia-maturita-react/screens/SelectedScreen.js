import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, getDoc, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';


const SelectedScreen = props => {

  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const [topics, setTopics] = useState([]);
  const topicsCollectionRef = collection(db, "topics");
  /* const test = collection(db, "literatura").doc("egVrtCz7c1b7sf6Uvqil") */

  const docRef = doc(db, "literatura", "egVrtCz7c1b7sf6Uvqil");

/* Ziskanie konkretneho dokumentu z databazy cez ID

getDoc(docRef)
  .then((doc) => {
    console.log(doc.data()), doc.id
  })

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})
*/


  const getTopics = async () => {
    const data = await getDocs(topicsCollectionRef);
    setTopics(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {

    getTopics();

    props.navigation.setOptions({
      title: "Hello",
    }); 

  }, []);

  return (

    <ScrollView style={styles.all} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Top",{
                title: 'nazov',
              });
            }}
            style={styles.test}
          >
            <Text>
              Literatúra
            </Text>
          </TouchableOpacity>

            {topics.map((topic) => {
              return(            
                <Text key={topic.id}>
                {/*
                <p>Typ: {topic.type}</p>
                <p>Id: {topic.id}</p>
                <p>Text:</p>  */}
                <RenderHtml
                contentWidth={width}
                source={{html: topic.text}}
                tagsStyles={tagsStyles}
                classesStyles={classesStyles}
                />
                </Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default SelectedScreen

const styles = StyleSheet.create({
  all: {
    marginLeft: "20px",
    marginRight: "20px",
  },  
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

  test:{
    backgroundColor: 'red',
  }
})

const tagsStyles = {
  body: {
    textAlign: "justify",
  },
  h4: {
    display: "flex",
    backgroundColor: 'rgba(205, 57, 88, 0.48)',
    borderRadius: 50,
    marginLeft: "0", 
    marginRight: "auto", 
    marginTop: "5px",
    marginBottom: "5px",
    padding: "4px 8px",
  },
  p:{
    margin: "5px",
  }
};

const classesStyles = {
  title:{
    backgroundColor: 'red',
    margin: 0,
  },
}