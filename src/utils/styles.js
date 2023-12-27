const getOptionColor = (optionValue) => {
  switch (optionValue) {
    case "Not started":
      return "#3d4b5f"; // Base
    case "In progress":
      return "#6495ED"; // Blue
    case "Skipped":
      return "#BE0000"; // Red
    case "Done":
      return "#00AB34"; // Green
    default:
      return "#3d4b5f"; // Default color
  }
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "150px",
    borderRadius: "8px",
    borderColor: state.isFocused ? "transparent" : "#1f2b3d",
    boxShadow: null,
    backgroundColor: "#1f2b3d",
    margin: "auto",
    ":hover": {
      backgroundColor: "#1f2b3d",
      borderColor: "#1f2b3d",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#334155" : "#1f2b3d",
    color: getOptionColor(state.data.value),
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: 0,
    boxShadow: "none",
    outline: "none",
    backgroundColor: "#1e293b",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: getOptionColor(state.data.value),
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#3d4b5f", // Set the color of the placeholder
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#fff",
    ":hover": { color: "#334155" },
  }),
};

export default customStyles;
