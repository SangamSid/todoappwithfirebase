import { useState } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import { TodoContext } from "./store/todos-context";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

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

  const ctxValue = {
    todos,
    modalOpen,
    isEditing,
    addTodo: addTask,
    removeTodo: removeTask,
    editTask: handleEdit,
    modalIsEditing: editTask,
    removeTodos: removeAllTodos,
    openModal,
    closeModal,
  };

  return (
    <TodoContext.Provider value={ctxValue}>
      <Header openModal={openModal}></Header>
      <Todo />
    </TodoContext.Provider>
  );
}
