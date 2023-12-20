import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import Button from "./Button";

export default function Todo({ todo, removeTodo, index, edit }) {
  const styles = "border-1 rounded-md bg-slate-100 px-3 py-1 m-1 end-0";

  return (
    <li
      key={index}
      className="rounded-md border-2 p-1 mb-1 bg-white w-full end-0 flex items-center justify-between"
    >
      <div>{todo}</div>
      <div className="flex space-x-1">
        <Button onClick={removeTodo} className={styles}>
          <MdDelete />
        </Button>
        <Button onClick={edit} className={styles}>
          <FaEdit />
        </Button>
      </div>
    </li>
  );
}
