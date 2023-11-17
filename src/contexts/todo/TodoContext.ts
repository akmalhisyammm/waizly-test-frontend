'use client';

import { createContext } from 'react';

import type { Todo, TodoPayload } from '@/types/todo';

type Context = {
  todos: Todo[];
  createTodo: (payload: TodoPayload) => void | null;
  updateTodo: (id: number, payload: TodoPayload) => void | null;
  deleteTodo: (id: number) => void | null;
  toggleTodo: (id: number) => void | null;
};

export const TodoContext = createContext<Context>({
  todos: [],
  createTodo: () => null,
  updateTodo: () => null,
  deleteTodo: () => null,
  toggleTodo: () => null,
});
