import { useState } from "react";
import Button from "./Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { date } from "../utils/date";

import { useContext } from "react";
import { TodoContext } from "../context/todos-context";

export default function TodoItem({ todo, timestamp }) {
  const formattedTimestamp = timestamp ? timestamp : date();

  const { toggleComplete, todoId } = useContext(TodoContext);

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
              onChange={() => toggleComplete()}
            />
          </div>
          <div>
            {todo.name}
            <p className="text-xs">{formattedTimestamp}</p>
          </div>
        </div>
        <div className="flex space-x-1">{todo.action}</div>
      </li>
    </>
  );
}
