import React from "react";
type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-[50rem] mx-auto px-3 ">{children}</div>;
};

export default Container;
