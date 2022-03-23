import { Dimensions, FlatList, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RootStackScreenProps, ScreenNames } from '@routers';
import { createTodo, updateTodo } from './actions';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/Feather';
import { Images } from '@constants';
import { Todo } from './types';
import { TodoView } from '@components';
import { selectTodos } from './selectors';
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

type EditMode = 'add' | 'edit';

const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }) => {

  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const todos = useSelector(selectTodos);
  const [content, setContent] = useState<string>('');
  const [mode, setMode] = useState<EditMode>('add');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTitleStyle: {
        color: 'white',
      }
    });
  });

  const onChangeContent = (content: string) => {
    setContent(content);
  };

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

  const onPressTodo = useCallback((todo: Todo) => {
    setMode('edit');
    setContent(todo.title);
    setSelectedTodo(todo);
  }, []);

  const renderTodo = (todo: Todo) => {
    return <TodoView todo={todo} onPress={onPressTodo}/>;
  };

  const renderHeader = (
    <View style={[styles.textInputContainer]}>
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

  useEffect(() => {

  }, []);

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