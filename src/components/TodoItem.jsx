import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Select from "react-select";
import customStyles from "../utils/styles";
import { useContext } from "react";
import { TodoContext } from "../context/todos-context";

export default function TodoItem({ todo, removeTodo, edit }) {
  const styles = "border-1 rounded-md bg-slate-100 px-3 py-1 m-1 end-0";
  const { startDate, setStartDate } = useContext(TodoContext);

  const options = [
    { value: "Not started", label: "Not started" },
    { value: "In progress", label: "In progress" },
    { value: "Skipped", label: "Skipped" },
    { value: "Done", label: "Done" },
  ];

  console.log(todo.id);

  return (
    <>
      <tr key={todo.id}>
        <td>{todo.task}</td>
        <td>
          <Select
            options={options}
            styles={customStyles}
            isSearchable={false}
          />
        </td>
        <td>
          <DatePicker
            selected={todo.date}
            onChange={(date) => setStartDate(date)}
            className="focus:outline-none w-40 h-8 bg-[#1e293b] ml-1"
            showIcon
            toggleCalendarOnIconClick
            dateFormat="dd/MM/yyyy"
          ></DatePicker>
        </td>
        <td>{todo.action}</td>
      </tr>

      {/* <Button onClick={removeTodo} className={styles}>
        <MdDelete />
      </Button>
      <Button onClick={edit} className={styles}>
        <FaEdit />
      </Button> */}
    </>
  );
}
