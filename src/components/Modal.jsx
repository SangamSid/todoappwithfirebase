import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useContext } from "react";
import { TodoContext } from "../context/todos-context";

export default function Modal({ title }) {
  const styles = "bg-[#29303d] hover:bg-[#29305d] font-bold rounded py-2 px-4 ";

  const { todos, addTodo, closeModal, editTask, isEditing } =
    useContext(TodoContext);

  const [editedTask, setEditedTask] = useState(todos);
  const [taskName, setTaskName] = useState("");

  function handleAddInputChange(e) {
    setTaskName(e.target.value);
  }

  function handleAddTask(e) {
    e.preventDefault();
    const todo = {
      id: Math.floor(Math.random() * 100),
      task: taskName,
      date: new Date(),
    };
    addTodo(todo);
  }

  function handleEditInputChange(e) {
    setEditedTask(e.target.value);
  }

  function handleEditTask(e) {
    e.preventDefault();
    editTask(editedTask);
  }

  return (
    <div className="w-screen h-screen z-[1000] fixed left-0 top-0 flex items-center justify-center opacity-100 bg-opacity-50 bg-gray-800 ">
      <div className="bg-[#ecedf6] w-[450px] h-[230px] m-auto relative font-sans rounded-lg flex items-center justify-center">
        <dialog className="w-[100%] h-[100%] block text-[#29305d] p-5 rounded-md bg-[#60728E]">
          <div>
            <form onSubmit={isEditing ? handleEditTask : handleAddTask}>
              <h1 className="text-xl mb-8 uppercase">{title}</h1>
              <label>
                Title
                <Input
                  handleEditOrAdd={
                    isEditing ? handleEditInputChange : handleAddInputChange
                  }
                />
              </label>
              <div className="flex items-center gap-4 justify-start mt-8 text-white">
                <Button className={styles}>{title}</Button>
                <Button type="button" className={styles} onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
}
