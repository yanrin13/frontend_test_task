import { useEffect, useState } from "react";
import type { Task, Filter } from "./types/Task";
import TaskService from "./services/TaskService";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import "./styles/app.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => TaskService.getTasks());
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    TaskService.saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks((prev) => TaskService.addTask(prev, title));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => TaskService.deleteTask(prev, id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => TaskService.toggleTask(prev, id));
  };

  const filteredTasks = TaskService.filterTasks(tasks, filter);

  const activeTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <main className="todo">
      <h1>Мои задачи:</h1>

      <TaskForm onAdd={addTask} />

      <TaskFilters filter={filter} onChange={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      <div className="todo__count">Осталось выполнить: {activeTasksCount}</div>
    </main>
  );
}

export default App;
