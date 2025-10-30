import { useState } from "react";
type TodoFormProps = {
  onAdd: (text: string) => void;
};

export const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [newTodoText, setNewTodoText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    onAdd(newTodoText);
    setNewTodoText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="todo-add-button">
        Add
      </button>
    </form>
  );
};
