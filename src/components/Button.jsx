import React from "react";

export default function Button({ children, onClick, className, type }) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}
