import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
type TodoItemProps = {
  todo: {
    id: string;
    complete: boolean;
    task: string;
  };
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isComplete, setIsComplete] = useState(todo.complete);

  const handleCheckBoxChange = (e: React.SyntheticEvent) => {
    setIsComplete(!isComplete);
  };
  return (
    <>
      {todo.complete ? (
        <div className="my-3 border border-gray0 p-3 rounded-md text-gray0 flex gap-3 items-center">
          <input
            type="checkbox"
            className="checkbox cursor-pointer"
            checked={isComplete}
            onClick={handleCheckBoxChange}
            id={todo.id}
          />
          <label htmlFor={todo.id} className="cursor-pointer">
            {todo.task}
          </label>

          <div className="ml-auto flex  gap-3">
            <FiEdit size={20} className="cursor-pointer" />
            <AiOutlineDelete size={22} className="cursor-pointer" />
          </div>
        </div>
      ) : (
        // not complete
        <div className="my-3 text-dark border border-gray p-3 rounded-md shadow flex gap-3 items-center">
          <input
            type="checkbox"
            className="checkbox cursor-pointer   "
            checked={isComplete}
            onClick={handleCheckBoxChange}
            id={todo.id}
          />
          <label htmlFor={todo.id} className="cursor-pointer">
            {todo.task}
          </label>
          <div className="ml-auto flex  gap-3 text-dark">
            <FiEdit size={20} className="cursor-pointer" />
            <AiOutlineDelete size={22} className="cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
