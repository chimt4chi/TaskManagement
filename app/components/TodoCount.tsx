import React from "react";

interface TodoCountProps {
  todoCount: number;
}

const TodoCount: React.FC<TodoCountProps> = ({ todoCount }) => {
  const todoText = todoCount === 1 ? "task" : "tasks";
  return (
    <p className="text-center p-2 text-white">
      {`You have ${todoCount} ${todoText}`}
    </p>
  );
};

export default TodoCount;
