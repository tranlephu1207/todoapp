import { Todo } from '@features';
import faker from '@faker-js/faker';
import { generateTodo } from './AppUtils';

export const createRandomTodos = (quant = 32) => {
  const todos: Todo[] = [];
  Array.from(Array(faker.datatype.number(quant)).keys()).forEach(() => {
    todos.push(generateTodo(faker.lorem.sentence()));
  });
  return todos;
};

export const createRandomTodo = (content: string) => {
  const todo: Todo = generateTodo(content);
  return todo;
};