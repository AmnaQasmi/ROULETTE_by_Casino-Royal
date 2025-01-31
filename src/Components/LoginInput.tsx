'use client'
import React from "react";

type LoginInputProps = {
  id: string;
  value: string;
  handleChange: (id: string, value: string) => void;
  name: string;
  error?: string;
};

const LoginInput: React.FC<LoginInputProps> = (props) => {
  const isMessageField = props.id === "message";

  return (
    <div className="bg-[#6A3502]">
      <div className="relative">
        {!isMessageField ? (
          <input
            type="text"
            id={props.id}
            value={props.value}
            onChange={(e) => props.handleChange(props.id, e.target.value)}
            className={`block px-2.5 pb-2.5 pt-4 w-full text-xl sm-mx:text-lg xs-mx:text-base sm-mx:pb-1 sm-mx:pt-2 rounded-md text-[#877337] bg-transparent border-[2px] border-[#877337] appearance-none hover:shadow-[0_0_8px_0_#87733770] focus:shadow-[0_0_8px_0_#87733770] focus:outline-none ${
              props.error ? "border-red-500" : ""
            } focus:ring-0 focus:border-[#877337] peer`}
            placeholder=""
          />
        ) : (
          <textarea
            value={props.value}
            name={props.id}
            id={props.id}
            onChange={(e) => props.handleChange(props.id, e.target.value)}
            rows={4}
            className={`block px-2.5 pb-2.5 xs-mx:text-base pt-4 w-full text-xl sm-mx:text-lg rounded-md text-[#877337] bg-transparent border-[2px] border-[#877337] ${
              props.error ? "border-red-500" : ""
            } appearance-none hover:shadow-[0_0_8px_0_#87733770] focus:shadow-[0_0_8px_0_#87733770] focus:outline-none focus:ring-0 focus:border-[#877337] peer`}
            placeholder=""
          ></textarea>
        )}
        <label
          htmlFor={props.id}
          className={`absolute ${
            props.error ? "border-red-500" : ""
          } text-xl sm-mx:text-lg xs-mx:text-base text-[#877337] duration-300 transform -translate-y-4 scale-100 top-1 z-10 origin-[0] bg-[#6A3502] px-2 peer-focus:px-2 peer-focus:text-[#877337] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 ${
            !isMessageField
              ? "peer-placeholder-shown:top-1/2"
              : "peer-placeholder-shown:top-6"
          } peer-focus:top-1 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
        >
          {props.name}
        </label>
      </div>
      {props.error && (
        <div className="text-red-500 sm-mx:text-sm xs-mx:text-xs ml-1 mt-1">
          {props.error}
        </div>
      )}
    </div>
  );
};

export default LoginInput;
