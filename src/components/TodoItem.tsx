import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import { useMutation } from "urql";
import { TodoType } from "../ts/Todos";
import { DELETE_TODO } from "../graphql/Mutation";

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [{ fetching, data, error }, deleteTask] = useMutation(DELETE_TODO);
  const [complete, setComplete] = useState(todo.complete);

  const handleCheckBoxChange = (e: React.SyntheticEvent) => {
    setComplete(!complete);
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    deleteTask({ id: todo.id });
  };

  return (
    <>
      <div
        className={`${
          complete ? "text-gray border-gray0" : " text-dark border-gray shadow "
        } my-3 border  p-3 rounded-md flex gap-3 items-center`}
      >
        <input
          type="checkbox"
          className="checkbox cursor-pointer   "
          checked={complete}
          onChange={handleCheckBoxChange}
          id={todo.id}
        />
        <label htmlFor={todo.id} className="cursor-pointer">
          {todo.task}
        </label>
        <div
          className={`${
            complete ? "text-gray" : "text-dark"
          } ml-auto flex  gap-3 `}
        >
          <Tippy content="Edit">
            <span>
              <FiEdit
                size={20}
                className="cursor-pointer hover:text-green transition-all duration-300"
              />
            </span>
          </Tippy>
          <Tippy content="Delete">
            <span onClick={handleDelete}>
              <AiOutlineDelete
                size={22}
                className="cursor-pointer hover:text-red  transition-all duration-300"
              />
            </span>
          </Tippy>
        </div>
      </div>
      {/* Modal */}
      {/* {openModal && (
        <Modal openModal onClose={() => setOpenModal(false)}>
          <h3 className="mt-3 mb-2 text-2xl">Edit</h3>

          <input value={todo.todo} />
          <div className="mt-10 min-w-[20rem]">
            <Button>Save</Button>
          </div>
        </Modal> */}
      {/* )} */}
    </>
  );
};

export default TodoItem;
