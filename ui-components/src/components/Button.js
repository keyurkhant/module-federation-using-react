import React from "react";

const Button = ({ label, onClick, type, className, buttonStyle }) => {
  let classNameValue = "btn " + className;

  return (
    <button
      className={classNameValue}
      onClick={onClick}
      style={buttonStyle}
      type={type ? type : "button"}
    >
      {label}
    </button>
  );
};

export default Button;
