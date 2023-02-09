import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import { useMutation } from "urql";
import { TodoType } from "../ts/Todos";
import { DELETE_TODO, UPDATE_COMPLETE, UPDATE_TODO } from "../graphql/Mutation";
import Modal from "./utility/Modal";
import Button from "./utility/Button";
import Spinner from "./utility/Spinner";

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateNewTask, setUpdateNewTask] = useState(todo.task);
  const [, deleteTask] = useMutation(DELETE_TODO);
  const [, updateTodo] = useMutation(UPDATE_TODO);
  const [, updateComplete] = useMutation(UPDATE_COMPLETE);

  const handleCheckBoxChange = (e: React.SyntheticEvent) => {
    updateComplete({ id: todo.id, complete: !todo.complete });
  };

  const handleTaskUpdate = (e: React.SyntheticEvent) => {
    updateTodo({ id: todo.id, task: updateNewTask });
    setOpenModal(false);
  };

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    deleteTask({ id: todo.id });
  };

  return (
    <>
      <div
        className={`${
          todo.complete
            ? "text-gray border-gray0"
            : " text-dark border-gray shadow "
        } my-3 border  p-3 rounded-md flex gap-3 items-center`}
      >
        <input
          type="checkbox"
          className="checkbox cursor-pointer   "
          checked={todo.complete}
          onChange={handleCheckBoxChange}
          id={todo.id}
        />
        <label htmlFor={todo.id} className="cursor-pointer">
          {todo.task}
        </label>
        <div
          className={`${
            todo.complete ? "text-gray" : "text-dark"
          } ml-auto flex  gap-3 `}
        >
          <Tippy content="Edit">
            <span onClick={() => setOpenModal(true)}>
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
      {/* EDIT */}
      {openModal && (
        <Modal openModal onClose={() => setOpenModal(false)}>
          <h3 className="mt-3 mb-2 text-2xl">Edit {todo.task}</h3>
          <input
            value={updateNewTask}
            onChange={(e) => setUpdateNewTask(e.target.value)}
          />
          <div className="mt-10 min-w-[20rem]">
            <Button onClick={handleTaskUpdate}>Update Task</Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TodoItem;
