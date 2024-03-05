import React from "react";

export const AlertTemplate: React.FC<{
  message: string;
  type?: boolean;
  className?: string;
}> = ({ message, type, className }) => {
  return (
    <div
      className={`${
        type ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"
      } border-2 rounded-md p-2 ${className}`}
      role="alert"
    >
      <p className="text-sm">{message}</p>
    </div>
  );
};
