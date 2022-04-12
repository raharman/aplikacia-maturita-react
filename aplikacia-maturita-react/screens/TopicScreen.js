import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, getDoc, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';


const TopicScreen = ({props, route}) => {

  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  const {title, type, topicId} = route.params;
  
  const docRef = doc(db, type, topicId);

  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  }) 

  /* useEffect(() => {

    navigation.setOptions({
      title: title,
    }); 
  }, []); */
  
  return (
    <Text>
      text
    </Text>
  /*
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
                <p>Text:</p>  }
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
    */
  ) 
}

export default TopicScreen

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