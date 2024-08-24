import { db } from './db';
import { ref, set, update, remove, get, onValue, push } from 'firebase/database';
import { TodoItem } from '../interfaces/types';



// Define a base path for your To-Do items
const todosRef = ref(db, 'todos');

// Create a new To-Do item
export const createTodo = async (todo: Omit<TodoItem, 'id'>): Promise<void> => {
  try {
    const newTodoRef = push(todosRef);
    await set(newTodoRef, { ...todo, id: newTodoRef.key });
    console.log('To-Do item created');
  } catch (error) {
    console.error('Error creating To-Do item:', error);
  }
};

// Update an existing To-Do item
export const updateTodo = async (id: string, updatedTodo: Partial<TodoItem>): Promise<void> => {
  try {
    const todoRef = ref(db, `todos/${id}`);
    await update(todoRef, updatedTodo);
    console.log('To-Do item updated', updatedTodo);
  } catch (error) {
    console.error('Error updating To-Do item:', error);
  }
};

// Delete a To-Do item
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const todoRef = ref(db, `todos/${id}`);
    await remove(todoRef);
    console.log('To-Do item deleted');
  } catch (error) {
    console.error('Error deleting To-Do item:', error);
  }
};

// Fetch all To-Do items
export const fetchTodos = async (): Promise<TodoItem[]> => {
  try {
    const snapshot = await get(todosRef);
    const data = snapshot.val();
    const todos: TodoItem[] = data
      ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
      : [];
    return todos;
  } catch (error) {
    console.error('Error fetching To-Do items:', error);
    return [];
  }
};

// Listener for data changes in the database
export const listenForTodos = (callback: (todos: TodoItem[]) => void) => {
  const unsubscribe = onValue(todosRef, (snapshot) => {
    const data = snapshot.val();
    console.log('Data received:', data); // Add this line
    const todos: TodoItem[] = data
      ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
      : [];
    callback(todos);
  });

  return unsubscribe; // Return the unsubscribe function for cleanup
};
