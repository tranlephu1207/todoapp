import { Todo } from '@features';
import { v4 as uuidv4 } from 'uuid';

export function generateTodo(content: string) {
  const todo: Todo = {
    id: uuidv4(),
    title: content,
    createdAt: Date.now()
  };
  return todo;
}