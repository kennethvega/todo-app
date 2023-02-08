import TodoItem from "./TodoItem";

const dummyData = [
  {
    id: "1",
    task: "Study react",
    complete: false,
  },
  {
    id: "2",
    task: "Study graphql",
    complete: false,
  },
  {
    id: "3",
    task: "Clean room",
    complete: true,
  },
];

const Todos = () => {
  return (
    <div>
      <h3 className="mt-10">To do's</h3>
      <>
        {dummyData.map((todo) => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
      </>
    </div>
  );
};

export default Todos;
