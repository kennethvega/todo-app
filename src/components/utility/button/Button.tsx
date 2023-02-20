type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
};

const Button = ({ children, onClick, type, disabled }: ButtonProps) => {
  return (
    <button aria-label="button" type={type} onClick={onClick} disabled={disabled} className="bg-green hover:bg-green2 py-2 px-5 rounded-md text-white w-full transition-all duration-300 flex  justify-center">
      {children}
    </button>
  );
};

export default Button;
