import Header from "./components/Header";
import Todo from "./components/Todo";
import TodoContextProvider from "./context/todos-context";

export default function App() {
  return (
    <TodoContextProvider>
      <Header />
      <Todo />
    </TodoContextProvider>
  );
}
