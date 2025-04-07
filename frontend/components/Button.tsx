import React from "react";

const Button = ({
  text,
  className,
  handleClick,
}: {
  text: string;
  className?: string;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`relative flex bg-background hover:bg-foreground text-foreground hover:text-background border-foreground hover:border-background whitespace-nowrap rounded-xl py-2.5 px-3 items-center justify-center pointer-events-auto border  ${className}`}
      onClick={handleClick}
    >
      <p className="font-medium">{text}</p>
    </button>
  );
};

export default Button;
