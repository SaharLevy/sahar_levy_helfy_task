import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask, toggleTask } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCarousel from "./components/TaskCarousel";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleAdd = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks([...tasks, res.data]);
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (err) {
        alert("Failed to delete task");
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTask(id);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      <TaskForm onSubmit={handleAdd} />

      <div className="filters">
        <button onClick={() => setFilter("all")} className="btn-black">
          All
        </button>
        <button onClick={() => setFilter("pending")} className="btn-black">
          Pending
        </button>
        <button onClick={() => setFilter("completed")} className="btn-black">
          Completed
        </button>
      </div>

      <TaskCarousel
        tasks={visibleTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default App;
