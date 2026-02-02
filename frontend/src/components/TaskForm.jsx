import { useState } from "react";
export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title) return;

    onSubmit(form);
    setForm({ title: "", description: "", priority: "low" });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add New Task</h3>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Task Title (Required)..."
        required
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description..."
      />
      <select
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="save-btn">
        Add Task
      </button>
    </form>
  );
}
