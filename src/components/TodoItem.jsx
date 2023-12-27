import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Select from "react-select";
import customStyles from "../utils/styles";
import { options } from "../utils/styles";
import { useContext } from "react";
import { TodoContext } from "../context/todos-context";

export default function TodoItem({ todo, removeTodo, edit }) {
  const styles = "border-1 rounded-md bg-slate-100 px-3 py-1 m-1 end-0";
  const { dateChange, selectedDates } = useContext(TodoContext);
  console.log(todo);
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
            selected={selectedDates[todo.id]}
            onChange={(date) => dateChange(todo.id, date)}
            className="focus:outline-none w-40 h-8 bg-[#1e293b] ml-1"
            showIcon
            toggleCalendarOnIconClick
            dateFormat="dd/MM/yyyy"
          ></DatePicker>
        </td>
        <td>
          <Button onClick={removeTodo} className={styles}>
            <MdDelete />
          </Button>
          <Button onClick={edit} className={styles}>
            <FaEdit />
          </Button>
        </td>
      </tr>
    </>
  );
}
