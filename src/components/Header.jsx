import { useState, useRef } from "react";
import Modal from "./Modal";
import Todo from "./Todo";
import Button from "./Button";
import { HiClipboardDocumentList } from "react-icons/hi2";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const styles =
    "border-2 py-2 px-10 rounded-md bg-[#29303d] hover:bg-[#29305d] mb-2 mr-2";
  const center = "flex justify-center";
  const between = "flex justify-between";

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setIsEditing(false);
  }

  function addTask(newTask) {
    if (newTask) {
      setTodos([...todos, newTask]);
      closeModal();
    }
  }

  function removeTask(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }

  function editTask(index) {
    setIsEditing(true);
    setModalOpen(true);
    setEditTaskIndex(index);
  }

  function handleEdit(editedTask) {
    const updatedTasks = [...todos];
    updatedTasks[editTaskIndex] = editedTask;
    setTodos(updatedTasks);
    setIsEditing(false);
    setModalOpen(false);
    setEditTaskIndex(null);
  }

  function removeAllTodos() {
    setTodos([]);
  }

  return (
    <>
      <div className="m-auto container max-w-2xl w-11/12 font-medium text-cyan-950">
        <div className="m-auto text-slate-100 ">
          <div className="text-center font-extrabold text-3xl text-cyan-950 mb-6 flex justify-center mt-6">
            <span className="mr-4 mt-1">
              <HiClipboardDocumentList />
            </span>
            <h1>TODO LIST</h1>
          </div>
          <div className={todos.length > 0 ? between : center}>
            <Button onClick={openModal} className={styles}>
              Add Todo
            </Button>
            {todos.length > 0 && (
              <Button onClick={removeAllTodos} className={styles}>
                Delete All
              </Button>
            )}
          </div>
          <div>
            {modalOpen && (
              <Modal
                onAdd={addTask}
                closeModal={closeModal}
                title="Add Task"
                todo={todos}
              ></Modal>
            )}
          </div>
        </div>
        <div className=" my-5">
          <ul className="rounded-md p-7 bg-slate-400">
            {todos.length === 0 && (
              <p className="text-center text-lg ">NO TODOS</p>
            )}
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                removeTodo={() => removeTask(index)}
                edit={() => editTask(index)}
              />
            ))}
            {isEditing && modalOpen && (
              <Modal
                closeModal={closeModal}
                title="Edit Task"
                onEdit={handleEdit}
                todo={todos}
                isEditing={isEditing}
              />
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
