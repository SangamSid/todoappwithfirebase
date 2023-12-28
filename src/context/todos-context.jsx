import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodoContext = createContext({
  todos: [],
  modalOpen: false,
  isEditing: false,
  selectedDates: {},
  addTodo: () => {},
  removeTodo: () => {},
  editTask: () => {},
  modalIsEditing: () => {},
  removeTodos: () => {},
  openModal: () => {},
  closeModal: () => {},
  dateChange: () => {},
  setTodos: () => {},
});

export default function TodoContextProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    id: new Date(),
  });

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setIsEditing(false);
  }

  function addTask(task) {
    setTodos([...todos, task]);
    closeModal();
  }

  function removeTask(todo) {
    setTodos(todos.filter((t) => t.id !== todo.id));
  }

  function modalIsEditing() {
    setIsEditing(true);
    setModalOpen(true);
  }

  function editTask(todoId, editedTask) {
    console.log("Editing todo with id:", todoId);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, task: editedTask } : todo
      )
    );
    setIsEditing(false);
    setModalOpen(false);
  }

  function removeAllTodos() {
    setTodos([]);
  }

  function handleDateChange(taskId, date) {
    setSelectedDates({
      ...selectedDates,
      [taskId]: date,
    });
  }

  const ctxValue = {
    todos,
    modalOpen,
    isEditing,
    selectedDates,
    addTodo: addTask,
    removeTodo: removeTask,
    editTask,
    modalIsEditing,
    removeTodos: removeAllTodos,
    openModal,
    closeModal,
    dateChange: handleDateChange,
    setTodos,
  };

  return (
    <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
  );
}
