import { useContext, useMemo } from 'react';
import Container from '../../components/utility/Container';
import AddTodo from '../../components/AddTodo';
import TodoItem from '../../components/TodoItem';
import { TodosQueryResult, TodoType } from '../../ts/Todos';
import { GET_TODOS } from '../../graphql/Query';
import { useQuery } from 'urql';
import { UserContext } from '../../context/AuthContext';
import Spinner from '../../components/utility/Spinner';
import Overlay from '../../components/utility/Overlay';

const fetch = true;
const Home = () => {
  const { user, validateUser } = useContext(UserContext);
  // fetch data
  const context = useMemo(() => ({ additionalTypenames: ['Todo'] }), []);
  const useTodosQuery = (id: string | undefined) => {
    return useQuery<TodosQueryResult>({
      query: GET_TODOS,
      variables: { id },
      context,
    });
  };
  const [result, reexecuteQuery] = useTodosQuery(user?.uid);
  const { fetching, data, error } = result;

  return (
    <>
      <div className="mt-10">
        <Container>
          <AddTodo />
          <h3 className="mt-10">To do's</h3>
          <hr className="border-gray my-3 " />

          {error && <p className="flex justify-center text-red">{error.message}</p>}
          {/* To do list  */}
          <div className="relative">
            {fetching && (
              <>
                <div className="flex justify-center absolute top-1/2  left-1/2">
                  <Spinner />
                </div>
                <div className="bg-white w-full h-full z-50 fixed opacity-70"></div>
              </>
            )}
            {data?.user?.todos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} reexecuteQuery={reexecuteQuery} />
            ))}
          </div>

          {data?.user?.todos.length === 0 && <p className="flex justify-center text-red">No task yet</p>}
        </Container>
      </div>
    </>
  );
};

export default Home;
