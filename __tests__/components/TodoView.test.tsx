import { Text, TodoView } from '@root/src/components';

import { generateTodo } from '@root/src/utils';
import renderer from 'react-test-renderer';

describe('TodoView', () => {
  const randomTodo = generateTodo('test');
  const onPressEvent = jest.fn();
  const onDeleteEvent = jest.fn();
  const onTickEvent = jest.fn();

  const tree = renderer
    .create(
      <TodoView
        todo={randomTodo}
        onPress={onPressEvent}
        onDelete={onDeleteEvent}
        onTick={onTickEvent}
        isTicked={false}
      />
    );

  it('should render correctly', async () => {
    const treeJSON = tree.toJSON();
    expect(treeJSON).toMatchSnapshot();
  });

  it('has correct values', async () => {
    expect(tree.root.findByType(Text).props.children).toBe(randomTodo.title);
    expect(tree.root.findByProps({ testID: 'leftIcon' }).props.name).toBe('square');
    tree.root.props.onPress();
    expect(onPressEvent.mock.calls.length).toBe(1);
    tree.root.props.onDelete();
    expect(onDeleteEvent.mock.calls.length).toBe(1);
    tree.root.props.onTick();
    expect(onTickEvent.mock.calls.length).toBe(1);
  });
});