import React, { useState, useContext } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import Tippy from '@tippyjs/react';
import { OperationContext, useMutation } from 'urql';
import { TodoType } from '../ts/Todos';
import { DELETE_TODO, UPDATE_TODO_DONE, UPDATE_TODO_TASK } from '../graphql/Mutation';
import Modal from './utility/Modal';
import Button from './utility/button/Button';
import Spinner from './utility/Spinner';
import { UserContext } from '../context/AuthContext';

type TodoItemProps = {
  todo: TodoType;
  reexecuteQuery: (opts?: Partial<OperationContext> | undefined) => void;
};

const TodoItem = ({ todo, reexecuteQuery }: TodoItemProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [updateNewTask, setUpdateNewTask] = useState(todo.task);
  const [, deleteTask] = useMutation(DELETE_TODO); //naming best practice e.g. deleteTaskResult.fetching
  const [updateTodoResult, updateTodo] = useMutation(UPDATE_TODO_TASK);
  const [, updateTodoDone] = useMutation(UPDATE_TODO_DONE);

  const handleCheckBoxChange = async () => {
    await updateTodoDone({ id: todo.id, done: !todo.done });
  };

  const handleDelete: React.MouseEventHandler<HTMLSpanElement> = async (e) => {
    e.preventDefault();
    await deleteTask({ id: todo.id });
  };

  const handleTaskUpdate: React.MouseEventHandler<HTMLSpanElement> = async (e) => {
    e.preventDefault();
    await updateTodo({ id: todo.id, task: updateNewTask }, { additionalTypenames: ['Todo'] });
    setOpenModal(false);
  };
  // classnames library || clsx
  return (
    <>
      <div className={`${todo.done ? 'text-gray border-gray0' : ' text-dark border-gray shadow '} my-3 border  p-3 rounded-md flex gap-3 items-center`}>
        <input type="checkbox" className="checkbox cursor-pointer   " checked={todo.done} onChange={handleCheckBoxChange} id={todo.id} />
        <label htmlFor={todo.id} className="cursor-pointer">
          {todo.task}
        </label>
        <div className={`${todo.done ? 'text-gray' : 'text-dark'} ml-auto flex  gap-3 `}>
          <Tippy content="Edit">
            <span onClick={() => setOpenModal(true)}>
              <FiEdit size={20} className="cursor-pointer hover:text-green transition-all duration-300" />
            </span>
          </Tippy>
          <Tippy content="Delete">
            <span onClick={handleDelete}>
              <AiOutlineDelete size={22} className="cursor-pointer hover:text-red  transition-all duration-300" />
            </span>
          </Tippy>
        </div>
      </div>
      {/* EDIT */}
      {openModal && (
        <Modal openModal onClose={() => setOpenModal(false)}>
          <h3 className="mt-3 mb-2 text-2xl">Edit {todo.task}</h3>
          <input value={updateNewTask} onChange={(e) => setUpdateNewTask(e.target.value)} className="input" />

          <div className="mt-10 min-w-[20rem]">
            {updateTodoResult.fetching ? (
              <Button>
                <Spinner />
              </Button>
            ) : (
              <Button onClick={handleTaskUpdate}>Update Task</Button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default TodoItem;
