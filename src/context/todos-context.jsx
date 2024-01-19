import { createContext, useState } from "react";
import { date } from "../utils/date";
import { v4 as uuidv4 } from "uuid";

import "firebase/firestore";
import firebaseConfig from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
  getDataFromFirebase: () => {},
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

  async function addTodo() {
    const timestamp = date();
    const newTodo = {
      id: todoId,
      name: taskName,
      timestamp: timestamp,
      completed: false,
    };

    try {
      await setDoc(doc(db, "added items", todoId), newTodo);
      setTodos([...todos, newTodo]);
      closeModal();
    } catch (error) {
      console.error("Error during adding a task in Firestore.");
    }
  }

  async function getDataFromFirebase() {
    try {
      const snapshot = await getDocs(collection(db, "added items"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (data.length === 0) {
        alert("No recently added todos!");
      } else {
        setTodos([...data]);
      }
    } catch (error) {
      console.error("Error during fetching data from Firestore: ", error);
    }
  }

  async function removeTodo(todo) {
    try {
      const docRef = doc(db, "added items", todo.id);
      await deleteDoc(docRef);
      console.log("Document has been deleted successfully.");
    } catch (error) {
      console.error("Error during deleting task from Firestore: ", error);
    }
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setCompletedTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  }

  async function removeAllTodos() {
    try {
      const colRef = collection(db, "added items");
      const docsSnapshot = await getDocs(colRef);
      docsSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log("All tasks have been deleted successfully.");
    } catch (error) {
      console.error("Error during deleting tasks from Firestore: ", error);
    }
    setTodos([]);
    setCompletedTodos([]);
  }

  function modalIsEditing(todo) {
    setIsEditing(true);
    setModalOpen(true);
    setTodoId(todo.id);
    setEditedTask(todo.name);
  }

  async function editTask(todoId, editedTask) {
    try {
      const data = {
        name: editedTask,
      };
      const docRef = doc(db, "added items", todoId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("There has been an error updating your todo!", error);
    }

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
    getDataFromFirebase,
  };

  return (
    <TodoContext.Provider value={ctxValue}>{children}</TodoContext.Provider>
  );
}
