import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';

export default function AddTodo({submitHandler}) {
  const [text, setText] = useState('');
  const changeHandler = (val) => {
    setText(val);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter new Todo..."
        onChangeText={changeHandler}
      />
      <Button
        title="Add Todo"
        color="coral"
        onPress={() => submitHandler(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
