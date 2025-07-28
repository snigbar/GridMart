import { type ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const ElavatedButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "w-full !mt-4 hover:-translate-y-1 transition-all hover:shadow-[3px_3px_0px_0px] active:shadow-[-1px_-1px_0px_0px] border border-black duration-300 font-semibold py-2 hover:bg-purple-400";

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
