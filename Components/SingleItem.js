import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const SingleItem = ({item, pressHandler}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => pressHandler(item.key)}>
        <Text>{item.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 20,
  },
});

export default SingleItem;
