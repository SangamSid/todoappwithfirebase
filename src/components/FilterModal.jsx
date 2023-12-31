import React, { useContext } from "react";
import Button from "./Button";
import { TodoContext } from "../context/todos-context";

export default function FilterModal() {
  const styles =
    "bg-[#29303d] hover:bg-[#29305d] font-bold rounded py-2 px-4 text-white mx-2";
  const { closeModal } = useContext(TodoContext);

  return (
    <div className="w-screen h-screen z-[1000] fixed left-0 top-0 flex items-center justify-center opacity-100 bg-opacity-50 bg-gray-800 ">
      <div className="bg-[#ecedf6] w-[350px] h-[230px] m-auto relative font-sans rounded-lg flex items-center justify-center">
        <dialog className="w-[100%] h-[100%] block text-white text-center p-5 rounded-md  bg-[#60728E]">
          <div className="w-full h-full">
            <div>
              <h1 className="text-xl text-cyan-950 font-semibold uppercase mb-10">
                Filter Todos
              </h1>
            </div>
            <div className="mb-12">
              <select
                name="Filter"
                defaultValue="Filter"
                className="rounded-md bg-[#29303d] focus:outline-none px-5 py-1 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Skipped">Skipped</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div>
              <Button className={styles}>Filter</Button>
              <Button onClick={closeModal} className={styles}>
                Cancel
              </Button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
