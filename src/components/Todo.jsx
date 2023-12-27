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
      <>{modalOpen && <Modal title="Add Task"></Modal>}</>
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
            {todos.length === 0 && (
              <tr>
                <td>
                  <p className="text-center text-lg">NO TODOS</p>
                </td>
              </tr>
            )}
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                removeTodo={() => removeTodo(id)}
                edit={() => modalIsEditing(id)}
              />
            ))}
            {isEditing && modalOpen && <Modal title="Edit Task" />}
          </tbody>
        </table>
      </div>
    </div>
  );
}
