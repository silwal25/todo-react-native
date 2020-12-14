import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';

{
  /** Importing Components */
}
import Header from './Components/Header';
import SingleItem from './Components/SingleItem';
import AddTodo from './Components/AddTodo';

const App = () => {
  const [todos, setTodos] = useState([
    {text: 'Buy Coffee', key: '1'},
    {text: 'Create an app', key: '2'},
    {text: 'Practice programming', key: '3'},
    {text: 'play guitar', key: '4'},
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return [{text: text, key: Math.random().toString()}, ...prevTodos];
    });
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
export default App;
