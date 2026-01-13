import { ReactNode, MouseEvent } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: "left" | "right" | "none";
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const Button = ({
  disabled = false,
  position = "none",
  children,
  icon,
  className = "",
  onMouseDown,
  ...props
}: ButtonProps) => {
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onMouseDown?.(e);
  };

  const roundedClass = {
    left: "rounded-l-lg",
    right: "rounded-r-lg",
    none: "rounded-lg",
  }[position];

  return (
    <button
      {...props}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      className={`w-9 h-full py-3 flex items-center justify-center bg-transparent ${roundedClass} text-xl font-light transition-all ${
        disabled
          ? "text-neutral-400 cursor-not-allowed"
          : "text-[var(--text-color-base)] hover:bg-neutral-700 cursor-pointer"
      } ${className}`}
    >
      {icon || children}
    </button>
  );
};
