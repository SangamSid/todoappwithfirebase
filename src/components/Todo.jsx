import React from "react";
import TodoItem from "./TodoItem";
import Modal from "./Modal";
import { TodoContext } from "../context/todos-context";
import { useContext } from "react";

export default function Todo() {
  const { todos, modalOpen, isEditing, removeTodo, modalIsEditing } =
    useContext(TodoContext);

  return (
    // <div className="m-auto container max-w-2xl">
    <div className="m-auto container max-w-2xl">
      {modalOpen && <Modal title="Add Task"></Modal>}
      <div className="my-5">
        <table className="rounded-md p-7 bg-slate-200">
          <thead>
            <tr>
              <th>TASK</th>
              <th>STATUS</th>
              <th>DUE DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                removeTodo={() => removeTodo(todo)}
                edit={modalIsEditing}
              />
            ))}
          </tbody>
        </table>
        {isEditing && modalOpen && <Modal title="Edit Task" />}
        {todos.length === 0 && (
          <div className="w-full h-10 bg-[#1e293b] text-[#697a94] flex items-center">
            <p className="text-center text-lg m-auto">NO TODOS</p>
          </div>
        )}
      </div>
    </div>
  );
}
