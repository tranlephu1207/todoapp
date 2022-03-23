import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteTodos, setTodoMode, tickTodo } from '@features/todo/actions';
import { selectDeletingTodoRecord, selectTodoEditMode } from '@features/todo/selectors';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { Todo } from '@features/todo/types.d';
import { useCallback } from 'react';
import { useMemo } from 'react';

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
  },
  titleButton: {
    flex: 1,
  },
});

interface TodoViewProps {
  todo: Todo;
}

const TodoView: React.FC<TodoViewProps> = ({ todo }) => {

  const dispatch = useDispatch();
  const records = useSelector(selectDeletingTodoRecord);
  const mode = useSelector(selectTodoEditMode);

  const isTicked = useMemo(() => !!records[todo.id], [records]);

  const onTickTodo = useCallback(() => {
    dispatch(tickTodo(todo));
  }, []);

  const onPressTodo = useCallback(() => {
    dispatch(setTodoMode(mode === 'add' ? 'edit' : 'add', todo));
  }, [mode]);

  const onPressDelete = useCallback(() => {
    dispatch(deleteTodos([todo]));
  }, []);

  return (
    <View style={styles.container} key={todo.id}>
      <Icon
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
