import { useMemo } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { todoCollection } from "./db";
import type { Todo } from "./types";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function TodoApp() {
  const { data: pendingTodos = [] } = useLiveQuery((q) =>
    q
      .from({ todo: todoCollection })
      .where(({ todo }) => eq(todo.completed, false))
  );

  const { data: completedTodos = [] } = useLiveQuery((q) =>
    q
      .from({ todo: todoCollection })
      .where(({ todo }) => eq(todo.completed, true))
  );
  const sortedPending = useMemo(
    () => [...pendingTodos].reverse(),
    [pendingTodos]
  );
  const sortedCompleted = useMemo(
    () => [...completedTodos].reverse(),
    [completedTodos]
  );
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    console.log("APP: Inserting new todo", newTodo);
    todoCollection.insert(newTodo);
  };

  const handleToggleTodo = (todo: Todo) => {
    console.log("APP: Toggling todo", todo);
    todoCollection.update(todo.id, (draft) => {
      draft.completed = !draft.completed;
    });
  };

  const handleDeleteTodo = (todo: Todo) => {
    console.log("APP: Deleting todo", todo);
    todoCollection.delete(todo.id);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">TanStack DB To-Do</h1>

      <TodoForm onAdd={handleAddTodo} />

      <TodoList
        title="Pending"
        todos={sortedPending}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />

      <TodoList
        title="Completed"
        todos={sortedCompleted}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default TodoApp;
