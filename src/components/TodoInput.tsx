import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from '@expo/vector-icons/Feather';
import React from 'react';

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgb(222, 222, 222)',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 5,
    width: windowWidth,
  },
  textInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    maxHeight: windowWidth * 0.5,
    flexShrink: 1,
  }
});

interface TodoInput {
  value?: string;
  onChangeText?: (text: string) => void;
  onPressButton?: () => void;
  buttonIcon: React.ReactElement<typeof Icon>;
}

const TodoInput: React.FC<TodoInput> = ({
  value,
  onChangeText,
  onPressButton,
  buttonIcon
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        multiline
        blurOnSubmit={true}
        placeholderTextColor="white"
        placeholder="Do it now!"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        onPress={onPressButton}
        style={{ marginLeft: 15 }}
      >
        {buttonIcon}
      </TouchableOpacity>
    </View>
  );
};

export default TodoInput;