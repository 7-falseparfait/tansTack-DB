import type { Todo } from "../types";
type TodoListProps = {
  title: string;
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export const TodoList = ({
  title,
  todos,
  onToggle,
  onDelete,
}: TodoListProps) => {
  console.log("todolistttt", todos);
  return (
    <div className="todo-list-container">
      <h2 className="todo-list-title">
        {title} ({todos.length})
      </h2>
      {todos.length === 0 ? (
        <p className="todo-item-placeholder">Nothing here!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => {
            console.log("todo", todo);
            const checkboxId = `todo-checkbox-${todo.id}`;
            return (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={todo.completed}
                  onChange={() => onToggle(todo)}
                  className="todo-item-checkbox"
                />
                <label
                  htmlFor={checkboxId}
                  style={{
                    color: "white",
                    display: "inline",
                    fontWeight: "bolder",
                  }}
                >
                  {todo.text || "NO TEXT"}
                </label>
                <button
                  onClick={() => onDelete(todo)}
                  className="todo-delete-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
