import { createContext } from "react";

export const TodoContext = createContext({
  todos: [],
  modalOpen: false,
  isEditing: false,
  addTodo: () => {},
  removeTodo: () => {},
  editTask: () => {},
  modalIsEditing: () => {},
  removeTodos: () => {},
  openModal: () => {},
  closeModal: () => {},
});
