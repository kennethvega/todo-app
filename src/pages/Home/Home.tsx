import { useContext, useMemo } from 'react';
import Container from '../../components/utility/Container';
import AddTodo from '../../components/AddTodo';
import TodoItem from '../../components/TodoItem';
import { TodoType } from '../../ts/Todos';
import { GET_TODOS } from '../../graphql/Query';
import { useQuery } from 'urql';
import { UserContext } from '../../context/AuthContext';
import Spinner from '../../components/utility/Spinner';
import useRedirectLoggedOutUser from '../../hooks/useRedirect';

// type GetTodosQueryResult = {
//   getTodos: TodoType[];
// };
// best practice
type TodosQueryResult = {
  user: {
    todos: TodoType[];
  };
};

const Home = () => {
  const { user, validateUser } = useContext(UserContext);
  // console.log(user?.uid);
  // fetch data
  const context = useMemo(() => ({ additionalTypenames: ['Todo'] }), []);
  const useTodosQuery = (id: string | undefined) => {
    return useQuery<TodosQueryResult>({
      query: GET_TODOS,
      variables: { id },
      context,
    });
  };

  const [result] = useTodosQuery(user?.uid);
  const { fetching, data, error } = result;
  // console.log(data.user.todos);

  return (
    <>
      <div className="mt-10">
        <Container>
          <AddTodo />
          <h3 className="mt-10">To do's</h3>
          <hr className="border-gray my-3" />
          {fetching && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {error && <p className="flex justify-center text-red">{error.message}</p>}
          {/* To do list  */}
          {data?.user?.todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}

          {data?.user?.todos.length === 0 && <p className="flex justify-center text-red">No task yet</p>}
        </Container>
      </div>
    </>
  );
};

export default Home;
