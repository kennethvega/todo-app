type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      aria-label="button"
      type={type}
      onClick={onClick}
      className="bg-green hover:bg-green2 py-2 px-5 rounded-md text-white w-full transition-all duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
