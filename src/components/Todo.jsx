import React from "react";
import TodoItem from "./TodoItem";
import Modal from "./Modal";
import { TodoContext } from "../context/todos-context";
import { useContext } from "react";

export default function Todo() {
  const { todos, modalOpen, isEditing, completedTodos } =
    useContext(TodoContext);

  return (
    <div className="m-auto container max-w-2xl">
      <div className="m-auto container max-w-2xl">
        {modalOpen && <Modal title="Add Task"></Modal>}
        <div className="my-10">
          {todos.length > 0 && (
            <>
              <div className="text-lg text-cyan-950">
                <p>Pending Todos</p>
              </div>
              <div className="border border-[#29303d] mb-2 bg-[#29303d]"></div>
            </>
          )}
          <ul className="rounded-md p-7 bg-slate-200">
            {todos.length === 0 && (
              <p className="text-center text-lg">NO TASKS</p>
            )}
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            {isEditing && modalOpen && <Modal title="Edit Task" />}
          </ul>
          {completedTodos.length > 0 ? (
            <>
              <div className="text-lg text-cyan-950 mt-4">
                <p>Completed Tasks</p>
              </div>
              <div className="border border-[#29303d] mb-2 bg-[#29303d]"></div>
              <ul className="rounded-md p-7 bg-slate-200">
                {completedTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
