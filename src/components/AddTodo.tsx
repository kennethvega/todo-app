import React, { useContext, useState } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';
import { ADD_TODO } from '../graphql/Mutation';
import { useMutation } from 'urql';
import { UserContext } from '../context/AuthContext';

const AddTodo = () => {
  const { user } = useContext(UserContext);
  const [newTask, setNewTask] = useState('');
  // fetching, data, error ?
  const [{ fetching, data, error }, addTask] = useMutation(ADD_TODO);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // wait first
    await addTask({ userId: user?.uid, task: newTask });
    setNewTask('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Add a task</label>
      <div className="flex gap-3 justify-center items-center max-h-[10rem] mt-2">
        <input type="text" id="task" value={newTask} onChange={(e) => setNewTask(e.target.value)} required maxLength={38} placeholder="Enter task" className="input h-[2.60rem] " />
        <button disabled={fetching}>
          <BsPlusSquareFill className="text-[2.6rem] text-green hover:text-green2 cursor-pointer transition-all duration-300" />
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
