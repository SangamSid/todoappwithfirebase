import Button from "./Button";
import Input from "./Input";
import { useContext, useEffect, useState, useRef } from "react";
import { TodoContext } from "../context/todos-context";
import { v4 as uuidv4 } from "uuid";

export default function Modal({ title }) {
  const styles = "bg-[#29303d] hover:bg-[#29305d] font-bold rounded py-2 px-4 ";

  const {
    addTodo,
    closeModal,
    editTask,
    isEditing,
    editedTask,
    setEditedTask,
    setTaskName,
    todoId,
    setTodoId,
  } = useContext(TodoContext);

  const inputValue = useRef();

  useEffect(() => {
    if (!isEditing) {
      setTodoId(uuidv4());
    }
  }, [isEditing, setTodoId]);

  function handleAddInputChange() {
    setTaskName(inputValue.current.value);
  }

  function handleAddTask(e) {
    e.preventDefault();
    addTodo();
  }

  function handleEditInputChange() {
    setEditedTask(inputValue.current.value);
  }

  function handleEditTask(e) {
    e.preventDefault();
    editTask(todoId, editedTask);
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
                  ival={inputValue}
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
