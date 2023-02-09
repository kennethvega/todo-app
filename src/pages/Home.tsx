import { useState, useContext } from "react";
import Container from "../components/utility/Container";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import { TodoType } from "../ts/Todos";
import { GET_TODOS } from "../graphql/Query";
import { useQuery } from "urql";
import { UserContext } from "../context/AuthContext";
import Spinner from "../components/utility/Spinner";
const Home = () => {
  const { user } = useContext(UserContext);
  // fetch data
  const [result] = useQuery({
    query: GET_TODOS,
    variables: { userId: user?.uid },
  });
  const { fetching, data, error } = result;

  return (
    <>
      <div className="mt-10">
        <Container>
          <AddTodo />
          <h3 className="mt-10">To do's</h3>
          {fetching && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {error && (
            <p className="flex justify-center text-red">{error.message}</p>
          )}

          {data?.getTodos.map((todo: TodoType) => {
            return <TodoItem todo={todo} key={todo.id} />;
          })}
          {data?.getTodos.length === 0 && (
            <p className="flex justify-center text-red">No task yet</p>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
