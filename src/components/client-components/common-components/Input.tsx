"use client";

import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type: string | "text" | "number" | "textArea";
  value?: string;
  onChange?: any;
  name?: string;
  required?: boolean;
  error?: string | null | undefined;
  classes?: string | undefined;
  iconClass?: string | undefined;
  LeftIcon?: null | undefined | (() => React.ReactNode);
  RightIcon?: null | undefined | (() => React.ReactNode);
  rightIconToggle?: VoidFunction;
  inputRef?: React.Ref<HTMLInputElement>;
}

const Input = React.forwardRef<
  HTMLInputElement & HTMLTextAreaElement,
  InputProps
>(
  (
    {
      label,
      placeholder,
      type,
      value,
      onChange,
      name,
      required = false,
      error,
      classes,
      iconClass,
      LeftIcon,
      RightIcon,
      rightIconToggle,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className="text-sm font-semibold text-black dark:text-white"
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <div className="w-full relative">
          {LeftIcon && (
            <div
              className={`absolute top-[50%] left-3 transform -translate-y-1/2 ${iconClass}`}
            >
              {LeftIcon()}
            </div>
          )}
          {type === "textArea" ? (
            <textarea
              ref={ref}
              value={value || ""}
              onChange={onChange}
              name={name}
              id={name}
              className={`w-full border-gray-300 shadow dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-primary bg-white dark:bg-customGrey-blackBg ${classes}`}
              required={required}
              placeholder={placeholder}
              {...props}
            />
          ) : (
            <input
              ref={ref}
              onChange={onChange}
              name={name}
              value={value}
              id={name}
              type={type}
              className={`w-full border-gray-300 shadow dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none bg-white dark:bg-customGrey-blackBg focus:shadow-none focus:ring-0 focus:dark:border-[#38C585] focus:border-[#38C585] ${
                error ? "border-red-500" : ""
              } ${classes}`}
              required={required}
              {...props}
              placeholder={placeholder}
            />
          )}
          {RightIcon && (
            <div
              className={`absolute top-[50%] right-10 transform -translate-y-1/2 ${iconClass} cursor-pointer`}
              onClick={rightIconToggle}
            >
              {RightIcon()}
            </div>
          )}
        </div>
        {error && (
          <p className="m-0 text-red-500 font-bold text-[13px] ms-2 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default React.memo(Input);
