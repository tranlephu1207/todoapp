import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    paddingHorizontal: 10,
    borderColor: '#F0F0F0',
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    flexWrap: 'wrap',
    flex: 1,
  },
  titleButton: {
    flex: 1,
  },
});

interface TodoViewProps {
  todo: Todo;
  onPress: (todo: Todo) => void;
}

const TodoView: React.FC<TodoViewProps> = ({ todo, onPress }) => {
  return (
    <View style={styles.container} key={todo.id}>
      <Icon
        name='square'
        size={30}
        color="#900"
        style={styles.leftIcon}
      />
      <TouchableOpacity style={styles.titleButton} onPress={() => onPress(todo)}>
        <Text style={styles.title}>{todo.title}</Text>
      </TouchableOpacity>
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
