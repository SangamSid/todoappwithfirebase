import { forwardRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Modal({
  todo,
  onAdd,
  onEdit,
  isEditing,
  closeModal,
  title,
}) {
  const styles = "bg-[#29303d] hover:bg-[#29305d] font-bold rounded py-2 px-4 ";

  const [editedTask, setEditedTask] = useState(todo);
  const [newTask, setNewTask] = useState(todo);

  function handleAddInputChange(e) {
    setNewTask(e.target.value);
  }

  function handleAddTask(e) {
    e.preventDefault();
    onAdd(newTask);
  }

  function handleEditInputChange(e) {
    setEditedTask(e.target.value);
  }

  function handleEditTask(e) {
    e.preventDefault();
    onEdit(editedTask);
  }

  return (
    <div className="w-screen h-screen z-[1000] fixed left-0 top-0 flex items-center justify-center opacity-100 bg-opacity-50 bg-gray-800 ">
      <div className="bg-[#ecedf6] w-[500px] h-[250px] m-auto relative font-sans rounded-lg flex items-center justify-center">
        <dialog className="w-[100%] h-[100%] block text-[#29305d] p-5">
          <form onSubmit={isEditing ? handleEditTask : handleAddTask}>
            <h1 className="text-xl mb-8">{title}</h1>
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
        </dialog>
      </div>
    </div>
  );
}
