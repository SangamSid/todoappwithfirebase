import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const TodoContext = createContext({
  todos: [],
  modalOpen: false,
  isEditing: false,
  isFiltering: false,
  taskName: "",
  editedTask: "",
  selectedDates: {},
  addTodo: () => {},
  removeTodo: () => {},
  editTask: () => {},
  modalIsEditing: () => {},
  removeAllTodos: () => {},
  openModal: () => {},
  closeModal: () => {},
  dateChange: () => {},
  setTodos: () => {},
  setTodoId: () => {},
  setTaskName: () => {},
  setEditedTask: () => {},
  modalIsFiltering: () => {},
});

const styles = "border-1 rounded-md bg-slate-100 px-3 py-1 m-1 end-0";

export default function TodoContextProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    id: new Date(),
  });
  const [todoId, setTodoId] = useState(uuidv4());
  const [taskName, setTaskName] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  function modalIsFiltering() {
    setIsFiltering(true);
  }

  const todoObj = {
    id: todoId,
    task: taskName,
    date: new Date(),
    action: (
      <>
        <Button onClick={removeTodo} className={styles}>
          <MdDelete />
        </Button>
        <Button onClick={modalIsEditing} className={styles}>
          <FaEdit />
        </Button>
      </>
    ),
  };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setIsEditing(false);
    setIsFiltering(false);
  }

  function addTodo() {
    setTodos([...todos, todoObj]);
    closeModal();
  }

  function removeTodo(todo) {
    setTodos(todos.filter((t) => t.id !== todo.id));
  }

  function modalIsEditing() {
    setIsEditing(true);
    setModalOpen(true);
    setTodoId(todoObj.id);
    setEditedTask(todoObj.task);
    console.log(todoObj.id);
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

  function dateChange(taskId, date) {
    setSelectedDates({
      ...selectedDates,
      [taskId]: date,
    });
  }

  const ctxValue = {
    todos,
    modalOpen,
    isEditing,
    isFiltering,
    taskName,
    editedTask,
    selectedDates,
    addTodo,
    removeTodo,
    editTask,
    modalIsEditing,
    removeAllTodos,
    openModal,
    closeModal,
    dateChange,
    setTodos,
    todoId,
    setTodoId,
    setTaskName,
    setEditedTask,
    modalIsFiltering,
  };

  return (
    <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
  );
}
