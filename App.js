import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
{
  /** Importing Components */
}
import Header from './Components/Header';
import SingleItem from './Components/SingleItem';
import AddTodo from './Components/AddTodo';
import bg from './assets/wall.jpg';

const App = () => {
  let temp;
  const [todos, setTodos] = useState('');
  const pressHandler = (key) => {
    Alert.alert(
      'Completion Confirmation',
      'You sure you have completed this task?',
      [
        {
          text: 'Oh Yeah!',
          onPress: () => {
            setTodos((prevTodos) => {
              return prevTodos.filter((todo) => todo.key != key);
            });
          },
        },
        {text: 'You know me so well..'},
      ],
    );
  };

  const submitHandler = async (text) => {
    if (text.length > 0) {
      setTodos((prevTodos) => {
        return [{text: text, key: Math.random().toString()}, ...prevTodos];
      });
    } else {
      Alert.alert(
        'Whoopsie..!',
        'You need to enter something if you want me to put that on the list...',
        [{text: 'Ok, I am a bit silly!'}],
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let local = await AsyncStorage.getItem('todoData');
        if (local != null) {
          setTodos(JSON.parse(local));
        } else {
          console.log(local);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function saveData() {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem('todoData', jsonValue);
      } catch (e) {
        console.log(e);
      }
    }
    saveData();
  }, [todos]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ImageBackground source={bg} style={styles.image}>
        <View style={styles.main}>
          {/**
           * Header
           */}
          <Header />

          <View style={styles.container}>
            <AddTodo submitHandler={submitHandler} />
            <View style={styles.content}>
              {/**
               * List
               */}
              <View style={styles.list}>
                <FlatList
                  data={todos}
                  renderItem={({item}) => (
                    <SingleItem item={item} pressHandler={pressHandler} />
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
export default App;
