import React from "react";
type CardProps = {
  children: React.ReactNode;
};
const Card = ({ children }: CardProps) => {
  return (
    <div className="p-10 border-gray border shadow rounded-md max-w-[24rem] mx-auto">
      {children}
    </div>
  );
};

export default Card;
