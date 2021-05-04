import React, { useState, useEffect } from "react";

const AlertButton: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  type: "submit" | "reset" | "button";
  msg: string;
  onClick: Function;
}> = ({ className, style, type = "button", children, msg, onClick }) => {
  const [clicked, setClicked] = useState<boolean>(false);
  useEffect(() => {
    if (clicked) {
      const response = window.confirm(msg);
      if (response) {
        onClick();
      }
      setClicked(false);
    }
  }, [clicked]);

  return (
    <button
      type={type}
      className={className}
      style={style}
      onClick={() => setClicked(true)}
    >
      {children}
    </button>
  );
};
export default AlertButton;
