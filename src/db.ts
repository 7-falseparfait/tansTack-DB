import { QueryClient } from "@tanstack/react-query";
import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection"; //new import
import { api } from "./api"; // import simulated API
import type { Todo } from "./types";

export const queryClient = new QueryClient();

//we no longer need the initialTodos. The API will provide that to us

// const initialTodos: Todo[] = [
//   { id: 1, text: "Learn TanStack DB", completed: true },
//   { id: 2, text: "Write the blog post", completed: false },
//   { id: 3, text: 'Show "live queries"', completed: false },
// ];

export const todoCollection = createCollection<Todo, number>(
  queryCollectionOptions({
    queryClient,
    queryKey: ["todos"],
    queryFn: api.todos.getAll,
    getKey: (todo) => todo.id,
    onInsert: async ({ transaction }) => {
      console.log("DB: Inserting...", transaction.mutations[0].modified);
      await api.todos.create(transaction.mutations[0].modified as Todo);
    },

    onUpdate: async ({ transaction }) => {
      console.log("DB: Updating...", transaction.mutations[0].modified);
      await api.todos.update(transaction.mutations[0].modified as Todo);
    },

    onDelete: async ({ transaction }) => {
      console.log("DB: Deleting...", transaction.mutations[0].original);
      await api.todos.delete(transaction.mutations[0].original.id);
    },
  })
);
