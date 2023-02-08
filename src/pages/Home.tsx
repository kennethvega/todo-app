import { useContext, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import Container from "../components/utility/Container";
import Todos from "../components/Todos";
import { UserContext } from "../context/AuthContext";

const initialState = [
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

const Home = () => {
  const [task, setTask] = useState(initialState);

  return (
    <div className="mt-10">
      <Container>
        <Todos task={task} setTask={setTask} />
      </Container>
    </div>
  );
};

export default Home;
