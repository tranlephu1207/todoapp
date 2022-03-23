import { StyleSheet, Text, TextInput, View } from 'react-native';

import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { Todo } from '@features';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    width: '100%',
    alignItems: 'center',
    minHeight: 40,
    paddingVertical: 10,
  },
  rightIcon: {
    marginRight: 15,
    marginLeft: 'auto'
  },
  leftIcon: {
    marginLeft: 15
  },
  title: {
    paddingLeft: 10,
    borderColor: '#F0F0F0',
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  }
});

interface TodoViewProps {
  todo: Todo;
}

const TodoView: React.FC<TodoViewProps> = ({ todo }) => {
  return (
    <View style={styles.container} key={todo.id}>
      <Icon
        name='square'
        size={30}
        color="#900"
        style={styles.leftIcon}
      />
      {/* <Text style={styles.title}>{todo.title}</Text> */}
      <TextInput
        value={todo.title}
        multiline={false}
      />
      <Icon
        name='trash-2'
        size={30}
        color="#900"
        style={styles.rightIcon}
      />
    </View>
  );
};

export default TodoView;
