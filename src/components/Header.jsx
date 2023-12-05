import { useState, useRef } from "react";
import Modal from "./Modal";
import Todo from "./Todo";

import { HiClipboardDocumentList } from "react-icons/hi2";
import Button from "./Button";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const input = useRef();

  const styles =
    "border-2 py-2 px-10 rounded-md bg-[#29303d] hover:bg-[#29305d] mb-2 mr-2";

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function addTask(e) {
    e.preventDefault();
    const newTodo = input.current.value;

    if (newTodo) {
      setTodos([...todos, newTodo]);
      closeModal();
      input.current.value = "";
    }
  }

  function removeTask(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="m-auto container max-w-2xl max-h-5xl w-11/12 font-medium text-cyan-950">
        <div className="m-auto text-slate-100 ">
          <div className="text-center font-extrabold text-3xl text-cyan-950 mb-6 flex justify-center mt-6">
            <span className="mr-4 mt-1">
              <HiClipboardDocumentList />
            </span>
            <h1>TODO LIST</h1>
          </div>
          <div className="display: flex justify-center mx-10">
            <Button onClick={openModal} className={styles}>
              Add Todo
            </Button>
          </div>
          <div>
            {modalOpen && (
              <Modal
                addTask={addTask}
                closeModal={closeModal}
                ref={input}
              ></Modal>
            )}
          </div>
        </div>
        <div className="mx-10 my-5 ">
          <ul className="rounded-md border-2 p-5 bg-slate-200">
            {todos.length === 0 && (
              <p className="text-center text-lg ">NO TODOS</p>
            )}
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                removeTodo={() => removeTask(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
