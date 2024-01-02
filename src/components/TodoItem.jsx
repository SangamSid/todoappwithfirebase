import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Select from "react-select";
import customStyles from "../utils/styles";
import { options } from "../utils/styles";
import { useContext } from "react";
import { TodoContext } from "../context/todos-context";

export default function TodoItem({ todo }) {
  const { dateChange, selectedDates, selectChange } = useContext(TodoContext);

  return (
    <>
      <tr key={todo.id}>
        <td>{todo.task}</td>
        <td>
          <Select
            options={options}
            styles={customStyles}
            isSearchable={false}
            defaultValue={options[0]}
            onChange={selectChange}
          />
        </td>
        <td>
          <DatePicker
            selected={selectedDates.id}
            onChange={(date) => dateChange(todo.id, date)}
            className="focus:outline-none w-40 h-8 bg-[#1e293b] ml-1"
            showIcon
            toggleCalendarOnIconClick
            dateFormat="dd/MM/yyyy"
          ></DatePicker>
        </td>
        <td>{todo.action}</td>
      </tr>
    </>
  );
}
