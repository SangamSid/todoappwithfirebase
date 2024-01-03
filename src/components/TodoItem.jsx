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

  const { toggleComplete } = useContext(TodoContext);

  return (
    <>
      <li
        key={todo.id}
        className={`rounded-md p-5 mb-1 w-full flex items-center justify-between ${
          todo.completed ? "bg-slate-400" : "bg-[#758aac]"
        }`}
      >
        <div className="text-white flex">
          <div className="flex items-center mr-2 cursor-pointer">
            <input
              className="cursor-pointer"
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
