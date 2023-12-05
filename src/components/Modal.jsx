/* eslint-disable react/jsx-key */

import { forwardRef } from "react";
import Button from "./Button";

/* eslint-disable react/prop-types */
const Modal = forwardRef((props, ref) => {
  const styles = "bg-[#29303d] hover:bg-[#29305d] font-bold rounded py-2 px-4 ";

  return (
    <div className="w-screen h-screen z-[1000] fixed left-0 top-0 flex items-center justify-center opacity-100 bg-opacity-50 bg-gray-800 ">
      <div className="bg-[#ecedf6] w-[500px] h-[250px] m-auto p-8 relative font-sans rounded-lg flex items-center justify-center">
        <form
          onSubmit={props.addTask}
          className="w-[100%] h-[100%] block text-[#29305d]"
        >
          <h1 className="text-xl mb-8">ADD TODO</h1>
          <label>
            Title
            <input
              required
              ref={ref}
              type="text"
              className="p-2 mt-1 border rounded text-black block w-full"
            />
          </label>

          <div className="flex items-center gap-4 justify-start mt-8 text-white">
            <Button className={styles}>Add Task</Button>
            <Button type="button" className={styles} onClick={props.closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
});

export default Modal;
