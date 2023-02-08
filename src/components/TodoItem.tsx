import React from "react";
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
  return (
    <>
      {todo.complete ? (
        <div className="my-3 border border-gray0 p-3 rounded-md text-gray0 flex gap-3 items-center">
          <input
            type="checkbox"
            className="checkbox cursor-pointer"
            // checked={todo.complete}
          />
          Complete
          <div className="ml-auto flex  gap-3">
            <FiEdit size={20} className="cursor-pointer" />
            <AiOutlineDelete size={20} className="cursor-pointer" />
          </div>
        </div>
      ) : (
        <div className="my-3 text-dark border border-gray p-3 rounded-md shadow flex gap-3 items-center">
          <input
            type="checkbox"
            className="checkbox cursor-pointer "
            // checked={todo.complete}
          />
          {todo.task}
          <div className="ml-auto flex  gap-3 text-dark">
            <FiEdit size={20} className="cursor-pointer" />
            <AiOutlineDelete size={20} className="cursor-pointer" />
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
