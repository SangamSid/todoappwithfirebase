import React from "react";
import TodoItem from "./TodoItem";
import Modal from "./Modal";
import { TodoContext } from "../context/todos-context";
import { useContext } from "react";

export default function Todo() {
  const { todos, modalOpen, isEditing, removeTodo, modalIsEditing } =
    useContext(TodoContext);

  return (
    <div className="m-auto container max-w-2xl">
      <>{modalOpen && <Modal title="Add Task"></Modal>}</>
      <div className="my-5">
        <ul className="rounded-md p-7 bg-slate-200">
          {todos.length === 0 && (
            <p className="text-center text-lg">NO TODOS</p>
          )}
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              removeTodo={() => removeTodo(index)}
              edit={() => modalIsEditing(index)}
            />
          ))}
          {isEditing && modalOpen && <Modal title="Edit Task" />}
        </ul>
      </div>
    </div>
  );
}
