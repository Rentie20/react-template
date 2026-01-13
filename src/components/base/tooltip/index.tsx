import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  message: ReactNode;
  className?: string;
}

export const Tooltip = ({
  children,
  message,
  className = "",
}: TooltipProps) => {
  return (
    <div className="relative input-number-group">
      {!!message && (
        <div className={`validation-message-tooltip-hover ${className}`}>
          {message}
        </div>
      )}
      {children}
    </div>
  );
};
