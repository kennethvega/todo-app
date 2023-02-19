import React from 'react';
type ErrorProps = {
  children: React.ReactNode;
};
const Error = ({ children }: ErrorProps) => {
  return <p className="text-red p-2 bg-red0 flex items-center gap-3">{children}</p>;
};

export default Error;
