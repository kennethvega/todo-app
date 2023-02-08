import { useState, SetStateAction, Dispatch } from "react";
import TodoItem from "./TodoItem";

type Task = {
  id: string;
  task: string;
  complete: boolean;
};
type TodosProps = {
  task: Task[];
  setTask: Dispatch<
    SetStateAction<{ id: string; task: string; complete: boolean }[]>
  >;
};

const Todos = ({ task, setTask }: TodosProps) => {
  return (
    <div>
      <h3 className="mt-10">To do's</h3>
      <>
        {task.map((todo) => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
      </>
    </div>
  );
};

export default Todos;
