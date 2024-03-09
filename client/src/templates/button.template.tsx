import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type MouseEventHandler } from "react";
import SpinnerTemplate from "./spinner.template";

const ButtonTemplate: React.FC<{
  icon?: IconProp;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  loading?: boolean;
}> = ({ icon, text, onClick, className, loading }): JSX.Element => {
  return (
    <button
      className={`bg-gradient-to-r from-black via-gray-900 to-black hover:from-gray-900 hover:via-black hover:to-gray-900 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
      onClick={onClick}
    >
      {icon && text ? (
        <>
          {loading ? (
            <SpinnerTemplate invertColor />
          ) : (
            <FontAwesomeIcon icon={icon} />
          )}
          <span className="ml-2">{text}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonTemplate;
