import React from "react";

const SpinnerTemplate: React.FC<{
  invertColor?: boolean;
}> = ({ invertColor }): JSX.Element => {
  return (
    <div
      className={`inline-block mr-1 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
        invertColor ? "text-white" : "text-black"
      }`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default SpinnerTemplate;
