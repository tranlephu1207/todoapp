import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { RootStackScreenProps, ScreenNames } from '@routers';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@expo/vector-icons/Feather';
import { Images } from '@constants';
import { Todo } from './types';
import { TodoView } from '@components';
import { createTodo } from './actions';
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
    maxHeight: windowWidth * 0.5
  }
});

type TodoScreenProps = RootStackScreenProps<ScreenNames.Todo>;

const TodoScreen: React.FC<TodoScreenProps> = ({ navigation }) => {

  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const todos = useSelector(selectTodos);
  const [content, setContent] = useState<string>('');

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

  const renderTodo = (todo: Todo) => {
    return <TodoView todo={todo} />;
  };

  const renderHeader = (
    <View style={[styles.textInputContainer]}>
      <TextInput
        style={styles.textInput}
        multiline={false}
        placeholderTextColor="white"
        placeholder="Do it now!"
        value={content}
        onChangeText={onChangeContent}
      />
      <TouchableOpacity
        onPress={onCreateTodo}
      >
        <Icon name="plus" size={30} color="#900" style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {

  }, []);

  return (
    <ImageBackground source={Images.background} style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={[styles.textInputContainer, { paddingTop: headerHeight }]}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={3}
            placeholderTextColor="white"
            placeholder="Do it now!"
            value={content}
            onChangeText={onChangeContent}
          />
          <TouchableOpacity
            onPress={onCreateTodo}
          >
            <Icon name="plus" size={30} color="#900" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
        <FlatList
          scrollEnabled={false}
          data={todos}
          keyExtractor={(todo, index) => `${todo.id}-${index}`}
          renderItem={({ item }) => renderTodo(item)}
        />
      </ScrollView> */}
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