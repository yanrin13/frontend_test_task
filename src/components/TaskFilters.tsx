import type { Filter } from "../types/Task";

interface TaskFiltersProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const filters: { label: string; value: Filter }[] = [
  { label: "Все", value: "all" },
  { label: "Активные", value: "active" },
  { label: "Выполненные", value: "completed" },
];

function TaskFilters({ filter, onChange }: TaskFiltersProps) {
  return (
    <div className="todo__filters">
      {filters.map((item) => (
        <button
          key={item.value}
          className={filter === item.value ? "active" : ""}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;
