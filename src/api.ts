// --- File: src/api.ts ---
// This file simulates a real server API using localStorage
// and adds a 1-second delay to mimic network latency.

import type { Todo } from "./types";

const TODOS_STORAGE_KEY = "todos";

// Helper function to simulate a network delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to load todos from localStorage
const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(TODOS_STORAGE_KEY);
  return data ? (JSON.parse(data) as Todo[]) : [];
};

// Helper function to save todos to localStorage
const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
};

// --- API Functions ---

export const api = {
  // GET /api/todos
  todos: {
    getAll: async () => {
      await wait(1000); // Simulate network delay
      console.log("SERVER: (GET) Fetched all todos");
      return loadTodos();
    },

    // POST /api/todos
    create: async (newTodo: Todo) => {
      await wait(1000);
      const todos = loadTodos();
      const updatedTodos = [...todos, newTodo];
      saveTodos(updatedTodos);
      console.log("SERVER: (POST) Created new todo", newTodo);
      return newTodo;
    },

    // PUT /api/todos/:id
    update: async (updatedTodo: Todo) => {
      await wait(1000);
      const todos = loadTodos();
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      saveTodos(updatedTodos);
      console.log("SERVER: (PUT) Updated todo", updatedTodo);
      return updatedTodo;
    },

    // DELETE /api/todos/:id
    delete: async (id: number) => {
      await wait(1000);
      const todos = loadTodos();
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      saveTodos(updatedTodos);
      console.log("SERVER: (DELETE) Deleted todo", id);
      return { id };
    },
  },
};
