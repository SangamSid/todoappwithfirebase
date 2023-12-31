import React from "react";
import TodoItem from "./TodoItem";
import Modal from "./Modal";
import { TodoContext } from "../context/todos-context";
import { useContext } from "react";
import FilterModal from "./FilterModal";

export default function Todo() {
  const { todos, modalOpen, isEditing, isFiltering } = useContext(TodoContext);

  return (
    // <div className="m-auto container max-w-2xl">
    <div className="m-auto container max-w-2xl">
      {modalOpen && <Modal key="add" title="Add Task"></Modal>}
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
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
        {isEditing && modalOpen && <Modal key="edit" title="Edit Task" />}
        {todos.length === 0 && (
          <div className="w-full h-10 bg-[#1e293b] text-[#697a94] flex items-center">
            <p className="text-center text-lg m-auto">NO TODOS</p>
          </div>
        )}
        {isFiltering && <FilterModal></FilterModal>}
      </div>
    </div>
  );
}
