import Icon from '@expo/vector-icons/Feather';
import React from 'react';
import { TextInput } from 'react-native';
import { TodoInput } from '@root/src/components';
import renderer from 'react-test-renderer';

describe('TodoInput', () => {
  const icon: React.ReactElement<typeof Icon> = (<Icon testID='testIcon' name="plus" size={30} color="#900" />);
  const tree = renderer
    .create(
      <TodoInput
        value="test"
        onPressButton={() => console.log('successful onPressButton')}
        onChangeText={(txt) => console.log(txt)}
        buttonIcon={icon}
      />
    );

  it('should render correctly', async () => {
    const treeJSON = tree.toJSON();
    expect(treeJSON).toMatchSnapshot();
  });

  it('has correct values', async () => {    
    expect(tree.root.findByType(TextInput).props.value).toBe('test');
    expect(tree.root.findByProps({ testID: 'testIcon' }).type).toEqual(icon.type);
  });
});