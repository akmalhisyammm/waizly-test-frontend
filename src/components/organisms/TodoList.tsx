'use client';

import { useContext, useRef, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { FaChevronDown, FaPlus } from 'react-icons/fa';

import { TodoContext } from '@/contexts/todo';
import { TodoCard } from '@/components/molecules';

const TodoList = () => {
  const [form, setForm] = useState<{ title: string }>({ title: '' });
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const searchParams = useSearchParams();

  const keyword = searchParams.get('search') || '';

  const alertCancelRef = useRef(null);

  const { todos, createTodo, updateTodo, deleteTodo, toggleTodo } =
    useContext(TodoContext);

  const handleBeforeCreateTodo = () => {
    setEditId(null);
    setDeleteId(null);
    setIsAdding(true);
  };

  const handleAfterCreateTodo = () => {
    createTodo(form);
    setForm({ title: '' });
    setIsAdding(false);
  };

  const handleBeforeUpdateTodo = (id: number) => {
    setIsAdding(false);
    setDeleteId(null);

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) return;

    setForm({ title: todo.title });
    setEditId(id);
  };

  const handleAfterUpdateTodo = () => {
    if (!editId) return;

    updateTodo(editId, form);
    setForm({ title: '' });
    setEditId(null);
  };

  const handleBeforeDeleteTodo = (id: number) => {
    setIsAdding(false);
    setEditId(null);
    setDeleteId(id);
  };

  const handleAfterDeleteTodo = () => {
    if (!deleteId) return;

    deleteTodo(deleteId);
    setDeleteId(null);
  };

  return (
    <Box>
      <Box paddingY={4}>
        <VStack align="stretch" spacing={4} marginBottom={4} gap={2}>
          {todos
            .filter(
              (todo) =>
                !todo.isCompleted &&
                todo.title.toLowerCase().includes(keyword.toLowerCase()),
            )
            .map((todo) => (
              <TodoCard
                key={todo.id}
                mode={todo.id === editId ? 'update' : 'view'}
                value={form.title}
                defaultValue={todo.title}
                onChange={(e) => setForm({ title: e.target.value })}
                onToggle={() => toggleTodo(todo.id)}
                onDismiss={() => setEditId(null)}
                onBeforeUpdate={() => handleBeforeUpdateTodo(todo.id)}
                onAfterUpdate={handleAfterUpdateTodo}
                onBeforeDelete={() => handleBeforeDeleteTodo(todo.id)}
              />
            ))}

          {isAdding ? (
            <TodoCard
              mode="create"
              value={form.title}
              onChange={(e) => setForm({ title: e.target.value })}
              onDismiss={() => setIsAdding(false)}
              onAfterCreate={handleAfterCreateTodo}
            />
          ) : (
            <Button
              colorScheme="blue"
              variant="outline"
              leftIcon={<FaPlus />}
              onClick={handleBeforeCreateTodo}>
              Add New Todo
            </Button>
          )}
        </VStack>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Completed (
                {
                  todos.filter(
                    (todo) =>
                      todo.isCompleted &&
                      todo.title.toLowerCase().includes(keyword.toLowerCase()),
                  ).length
                }
                )
              </Box>
              <FaChevronDown />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack align="stretch" spacing={4} marginBottom={4} gap={2}>
                {todos
                  .filter(
                    (todo) =>
                      todo.isCompleted &&
                      todo.title.toLowerCase().includes(keyword.toLowerCase()),
                  )
                  .map((todo) => (
                    <TodoCard
                      key={todo.id}
                      mode={todo.id === editId ? 'update' : 'view'}
                      value={form.title}
                      defaultValue={todo.title}
                      onChange={(e) => setForm({ title: e.target.value })}
                      onToggle={() => toggleTodo(todo.id)}
                      onDismiss={() => setEditId(null)}
                      onBeforeUpdate={() => handleBeforeUpdateTodo(todo.id)}
                      onAfterUpdate={handleAfterUpdateTodo}
                      onBeforeDelete={() => handleBeforeDeleteTodo(todo.id)}
                      isCompleted
                    />
                  ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <AlertDialog
        isOpen={!!deleteId}
        leastDestructiveRef={alertCancelRef}
        motionPreset="slideInBottom"
        onClose={() => setDeleteId(null)}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Todo</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this todo?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={alertCancelRef} onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              marginLeft={2}
              onClick={handleAfterDeleteTodo}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default TodoList;
