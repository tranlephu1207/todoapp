import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { Text } from '@components';
import { Todo } from '@features/todo/types.d';
import { useCallback } from 'react';

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
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    flexWrap: 'wrap',
  },
  titleButton: {
    flex: 1,
  },
});

interface TodoViewProps {
  todo: Todo;
  onTick:  (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onPress: (todo: Todo) => void;
  isTicked: boolean;
}

const TodoView: React.FC<TodoViewProps> = ({
  todo,
  onPress,
  onDelete,
  onTick,
  isTicked = false
}) => {

  const onTickTodo = useCallback(() => {
    onTick?.(todo);
  }, [onTick, todo]);

  const onPressTodo = useCallback(() => {
    onPress?.(todo);
  }, [onPress, todo]);

  const onPressDelete = useCallback(() => {
    onDelete?.(todo);
  }, [onDelete, todo]);

  return (
    <View style={styles.container} key={todo.id}>
      <Icon
        testID='leftIcon'
        name={isTicked ? 'check-square' : 'square'}
        size={30}
        color="#900"
        style={styles.leftIcon}
        onPress={onTickTodo}
      />
      <TouchableOpacity style={styles.titleButton} onPress={onPressTodo}>
        <Text style={styles.title}>{todo.title}</Text>
      </TouchableOpacity>
      <Icon
        testID='rightIcon'
        name='trash-2'
        size={30}
        color="#900"
        style={styles.rightIcon}
        onPress={onPressDelete}
      />
    </View>
  );
};

export default TodoView;
