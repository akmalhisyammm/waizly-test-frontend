'use client';

import { useState } from 'react';

import { TodoContext } from './TodoContext';

import type { Todo, TodoPayload } from '@/types/todo';

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = (payload: TodoPayload) => {
    const newTodo = {
      id: todos.length + 1,
      title: payload.title,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number, payload: TodoPayload) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);

    newTodos[todoIndex].title = payload.title;

    setTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const toggleTodo = (id: number) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.id === id);

    newTodos[todoIndex].isCompleted = !newTodos[todoIndex].isCompleted;

    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
