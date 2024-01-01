import React, { useContext } from "react";
import Button from "./Button";
import { TodoContext } from "../context/todos-context";
import Select from "react-select";
import customStyles from "../utils/styles";
import { filterOptions } from "../utils/styles";

export default function FilterModal() {
  const styles =
    "bg-[#29303d] hover:bg-[#29305d] font-bold rounded py-2 px-4 text-white mx-2";
  const { closeModal, modalFilterChange, filterTodos } =
    useContext(TodoContext);

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
            <div className="mb-12 text-[#697a94]">
              <Select
                options={filterOptions}
                styles={customStyles}
                isSearchable={false}
                defaultValue={filterOptions[0]}
                onChange={modalFilterChange}
              />
            </div>
            <div>
              <Button className={styles} onClick={filterTodos}>
                Filter
              </Button>
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
