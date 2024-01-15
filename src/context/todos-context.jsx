import { createContext, useState } from "react";
import { date } from "../utils/date";
import { v4 as uuidv4 } from "uuid";

export const TodoContext = createContext({
  todos: [],
  modalOpen: false,
  isEditing: false,
  taskName: "",
  editedTask: "",
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
  moveToCompleted: () => {},
});

export default function TodoContextProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(uuidv4());
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setIsEditing(false);
  }

  function addTodo() {
    const timestamp = date();
    const newTodo = {
      id: todoId,
      name: taskName,
      timestamp: timestamp,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    closeModal();
  }

  function removeTodo(todo) {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setCompletedTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  }

  function removeAllTodos() {
    setTodos([]);
    setCompletedTodos([]);
  }

  function modalIsEditing(todo) {
    setIsEditing(true);
    setModalOpen(true);
    setTodoId(todo.id);
    setEditedTask(todo.name);
  }

  function editTask(todoId, editedTask) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, name: editedTask } : todo
      )
    );
    setIsEditing(false);
    setModalOpen(false);
  }

  const moveToCompleted = (todoId) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: true,
            }
          : todo
      );

      const completedTask = updatedTodos.find(
        (todo) => todo.id === todoId && todo.completed
      );

      if (completedTask) {
        setCompletedTodos((prevCompletedTodos) => {
          // Check if the task is already in completedTodos array
          const isTaskInCompleted = prevCompletedTodos.some(
            (todo) => todo.id === completedTask.id
          );

          // Add the task only if it's not already in completedTodos (If isTaskInCompleted is false)
          return isTaskInCompleted
            ? prevCompletedTodos
            : [...prevCompletedTodos, completedTask];
        });
      }

      return updatedTodos.filter((todo) => !todo.completed);
    });
  };

  const ctxValue = {
    todos,
    modalOpen,
    isEditing,
    taskName,
    editedTask,
    completedTodos,
    todoId,
    addTodo,
    removeTodo,
    editTask,
    modalIsEditing,
    removeAllTodos,
    openModal,
    closeModal,
    setTodos,
    setTaskName,
    setEditedTask,
    moveToCompleted,
    setTodoId,
  };

  return (
    <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
  );
}
