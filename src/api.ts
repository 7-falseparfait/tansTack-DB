import type { Todo } from "./types";

const TODOS_STORAGE_KEY = "todos";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(TODOS_STORAGE_KEY);
  return data ? (JSON.parse(data) as Todo[]) : [];
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
};

export const api = {
  todos: {
    getAll: async () => {
      await wait(1000); // Simulate network delay
      console.log("SERVER: (GET) Fetched all todos");
      return loadTodos();
    },

    create: async (newTodo: Todo) => {
      await wait(1000);
      const todos = loadTodos();
      const updatedTodos = [...todos, newTodo];
      saveTodos(updatedTodos);
      console.log("SERVER: (POST) created new todo", newTodo);
      return newTodo;
    },

    update: async (updatedTodo: Todo) => {
      await wait(1000);
      const todos = loadTodos();
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      saveTodos(updatedTodos);
      console.log("SERVER: (PUT) updated todo", updatedTodo);
      return updatedTodo;
    },

    delete: async (id: number) => {
      await wait(1000);
      const todos = loadTodos();
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      saveTodos(updatedTodos);
      console.log("SERVER: (DELETE) deleted todo", id);
      return { id };
    },
  },
};
