import { createContext, useState } from "react";

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
  const [editTaskIndex, setEditTaskIndex] = useState(null);
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
    editTask: handleEdit,
    modalIsEditing: editTask,
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
