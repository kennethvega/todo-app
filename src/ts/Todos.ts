export type TodoType = {
  done: boolean;
  id: string;
  task: string;
  userID: string;
};
export type TodosQueryResult = {
  user: {
    todos: TodoType[];
  };
};
