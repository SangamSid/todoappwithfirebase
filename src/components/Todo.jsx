import { MdDelete } from "react-icons/md";
import Button from "./Button";

export default function Todo({ todo, removeTodo, index }) {
  const styles = "border-1 rounded-md bg-slate-100 px-3 mr-2";

  return (
    <li
      key={index}
      className="rounded-md border-2 m-2 p-2 bg-white flex justify-between"
    >
      {todo}
      <Button onClick={removeTodo} className={styles}>
        <MdDelete />
      </Button>
    </li>
  );
}
