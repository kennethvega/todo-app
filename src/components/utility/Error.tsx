import React from 'react';
type ErrorProps = {
  children: React.ReactNode;
};
const Error = ({ children }: ErrorProps) => {
  return <p className="text-red border p-2 bg-red0 rounded-md">{children}</p>;
};

export default Error;
