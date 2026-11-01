import type { Task, Filter } from "../types/Task";

const STORAGE_KEY = "todo-tasks";

export default class TaskService {
  static getTasks(): Task[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {
      return JSON.parse(data) as Task[];
    } catch {
      return [];
    }
  }

  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  static addTask(tasks: Task[], title: string): Task[] {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return tasks;

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    return [...tasks, newTask];
  }

  static deleteTask(tasks: Task[], id: number): Task[] {
    return tasks.filter((task) => task.id !== id);
  }

  static toggleTask(tasks: Task[], id: number): Task[] {
    return tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
  }

  static filterTasks(tasks: Task[], filter: Filter): Task[] {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);

      case "completed":
        return tasks.filter((task) => task.completed);

      default:
        return tasks;
    }
  }
}
