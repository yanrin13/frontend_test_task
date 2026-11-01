import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    onAdd(input);
    setInput("");
  };

  return (
    <div className="todo__form">
      <input
        type="text"
        maxLength={150}
        placeholder="Введите задачу..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <button onClick={handleSubmit}>+</button>
    </div>
  );
}

export default TaskForm;
