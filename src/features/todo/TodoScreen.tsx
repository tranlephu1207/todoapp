import { FlatList, ImageBackground, StyleSheet } from 'react-native';
import React, { useCallback, useLayoutEffect } from 'react';
import { RootStackScreenProps, ScreenNames } from '@routers';
import { TodoInput, TodoView } from '@components';
import { changeTodoContent, createTodo, deleteTodos, setTodoMode, tickTodo, updateTodo } from './actions';
import { selectDeletingTodos, selectSelectedTodo, selectTodoContent, selectTodoEditMode, selectTodos } from './selectors';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/Feather';
import { Images } from '@constants';
import { Todo } from './types';
import { useHeaderHeight } from '@react-navigation/elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    marginTop: '10%',
    fontSize: 16,
    color: 'white',
  },
  flatListContent: {
    flexGrow: 1,
  }
});

type TodoScreenProps = RootStackScreenProps<ScreenNames.Todo>;


const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }) => {

  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const todos = useSelector(selectTodos);
  const { todos: selectedTodos, ids: selectedTodoIds } = useSelector(selectDeletingTodos);
  const content = useSelector(selectTodoContent);
  const mode = useSelector(selectTodoEditMode);
  const selectedTodo = useSelector(selectSelectedTodo);

  /**
   * Listen to onChangeText of TodoInput's TextInput
   */
  const onChangeContent = useCallback((text: string) => {
    dispatch(changeTodoContent(text));
  }, [dispatch]);

  const onCreateTodo = useCallback(() => {
    if (content !== '') {
      dispatch(createTodo(content));
    }
  }, [content, dispatch]);

  const onUpdateTodo = useCallback(() => {
    /**
     * Execute only when one todo is selected
     * and value of content is not empty
     */
    if (selectedTodo && content !== '') {
      const updatedTodo: Todo = {
        ...selectedTodo,
        title: content,
      };
      dispatch(updateTodo(updatedTodo));
    }
  }, [selectedTodo, content, dispatch]);

  const onPressTodo = useCallback((todo: Todo) => {
    /**
     * Change Edit mode whenever user taps on
     * content of TodoView
     */
    dispatch(setTodoMode(mode === 'add' ? 'edit' : 'add', todo));
  }, [dispatch, mode]);

  const onPressTick = useCallback((todo: Todo) => {
    dispatch(tickTodo(todo));
  }, [dispatch]);

  /**
   * Helper function to assign to per TodoView's onDelete
   * and delete button on Navigation Bar
   */
  const onDeleteTodos = useCallback((todos: Todo[]) => {
    dispatch(deleteTodos(todos));
  }, [dispatch]);

  const onPressDelete = useCallback((todo: Todo) => {
    onDeleteTodos([todo]);
  }, [onDeleteTodos]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
      },
      /*
       * Show delete button on navigation bar when one
       * or multiple todo(s) ticked
       */
      headerRight: () => selectedTodos.length > 0 && (
        <Icon
          name='trash-2'
          size={30}
          color="white"
          onPress={() => onDeleteTodos(selectedTodos)}
        />
      )
    });
  }, [navigation, onDeleteTodos, selectedTodos]);

  const renderTodo = (todo: Todo) => {
    return (
      <TodoView
        todo={todo}
        onPress={onPressTodo}
        onDelete={onPressDelete}
        onTick={onPressTick}
        isTicked={selectedTodoIds.includes(todo.id)}
      />
    );
  };

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <TodoInput
            value={content}
            onChangeText={onChangeContent}
            onPressButton={mode === 'add' ? onCreateTodo : onUpdateTodo}
            buttonIcon={<Icon name={mode === 'add' ? 'plus' : 'edit-2'} size={30} color="#900" />}
          />
        }
        data={todos}
        keyExtractor={(todo, index) => `${todo.id}-${index}`}
        renderItem={({ item }) => renderTodo(item)}
        style={{ marginTop: headerHeight }}
        contentContainerStyle={styles.flatListContent}
      />
    </ImageBackground>
  );
};

export default TodoScreen;