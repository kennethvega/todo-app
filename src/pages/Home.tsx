import { useContext } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import Container from "../components/utility/Container";
import Todos from "../components/Todos";
import { UserContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="mt-10">
      <Container>
        <h2>Add a task</h2>
        <div className="flex gap-3 justify-center items-center max-h-[10rem] ">
          <input />
          <BsPlusSquareFill className="text-[2.6rem] text-green hover:text-green2 cursor-pointer transition-all duration-300" />
        </div>
        <Todos />
      </Container>
    </div>
  );
};

export default Home;
