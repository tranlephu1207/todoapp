import { Dimensions, FlatList, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useLayoutEffect } from 'react';
import { RootStackScreenProps, ScreenNames } from '@routers';
import { changeTodoContent, createTodo, updateTodo } from './actions';
import { selectSelectedTodo, selectTodoContent, selectTodoEditMode, selectTodos } from './selectors';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/Feather';
import { Images } from '@constants';
import { Todo } from './types';
import { TodoView } from '@components';
import { useHeaderHeight } from '@react-navigation/elements';

const { width: windowWidth } = Dimensions.get('window');

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
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgb(222, 222, 222)',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 5,
    width: windowWidth,
  },
  textInput: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    maxHeight: windowWidth * 0.5,
    flexShrink: 1,
  }
});

type TodoScreenProps = RootStackScreenProps<ScreenNames.Todo>;


const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }) => {

  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const todos = useSelector(selectTodos);
  const content = useSelector(selectTodoContent);
  const mode = useSelector(selectTodoEditMode);
  const selectedTodo = useSelector(selectSelectedTodo);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTitle: 'Today\'s Todos',
      headerTitleStyle: {
        color: 'white',
        fontWeight: 'bold'
      }
    });
  });

  const onChangeContent = useCallback((text: string) => {
    dispatch(changeTodoContent(text));
  }, []);

  const onCreateTodo = useCallback(() => {
    if (content !== '') {
      dispatch(createTodo(content));
    }
  }, [content]);

  const onUpdateTodo = useCallback(() => {
    if (selectedTodo && content !== '') {
      const updatedTodo: Todo = {
        ...selectedTodo,
        title: content,
      };
      dispatch(updateTodo(updatedTodo));
    }
  }, [selectedTodo, content]);

  const renderTodo = (todo: Todo) => {
    return <TodoView todo={todo} />;
  };

  const renderHeader = (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        multiline
        blurOnSubmit={true}
        placeholderTextColor="white"
        placeholder="Do it now!"
        value={content}
        onChangeText={onChangeContent}
      />
      <TouchableOpacity
        onPress={mode === 'add' ? onCreateTodo : onUpdateTodo}
      >
        <Icon name={mode === 'add' ? 'plus' : 'edit-2'} size={30} color="#900" style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        data={todos}
        keyExtractor={(todo, index) => `${todo.id}-${index}`}
        renderItem={({ item }) => renderTodo(item)}
        style={{ marginTop: headerHeight }}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </ImageBackground>
  );
};

export default TodoScreen;