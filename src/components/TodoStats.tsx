interface TodoStatsProps {
  total: number
  completed: number
  active: number
}

export function TodoStats({ total, completed, active }: TodoStatsProps) {
  return (
    <div className="todo-stats">
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  )
}
