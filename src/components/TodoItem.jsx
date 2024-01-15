import Button from "./Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { date } from "../utils/date";

import { useContext } from "react";
import { TodoContext } from "../context/todos-context";

export default function TodoItem({ todo }) {
  const styles = "border-1 rounded-md bg-slate-100 px-3 py-1 m-1 end-0";

  const { moveToCompleted, removeTodo, modalIsEditing } =
    useContext(TodoContext);

  return (
    <>
      <li
        key={todo.id}
        className={`transition duration-150 ease-in-out rounded-md p-5 mb-1 w-full flex items-center justify-between ${
          todo.completed
            ? "bg-slate-400 opacity-40 line-through"
            : "bg-[#758aac]"
        }`}
      >
        <div className="text-white flex">
          <div className="flex items-center mr-2">
            <input
              className="form-checkbox cursor-pointer"
              type="checkbox"
              checked={todo.completed}
              onChange={() => moveToCompleted(todo.id)}
            />
          </div>
          <div>
            {todo.name}
            <p className="text-xs">{todo.timestamp}</p>
          </div>
        </div>
        <div className="flex space-x-1">
          {!todo.completed && (
            <>
              <Button onClick={() => removeTodo(todo)} className={styles}>
                <MdDelete />
              </Button>
              <Button onClick={() => modalIsEditing(todo)} className={styles}>
                <FaEdit />
              </Button>
            </>
          )}
          {todo.completed && (
            <Button onClick={() => removeTodo(todo)} className={styles}>
              <MdDelete />
            </Button>
          )}
        </div>
      </li>
    </>
  );
}
