import React, { useRef } from "react";

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const CustomOtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newInputs = inputsRef.current.map((input, i) =>
        i === index ? value : input!.value
      );
      inputsRef.current[index]!.value = value;
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      onChange(newInputs.join(""));
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && inputsRef.current[index]!.value === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleRef = (el: HTMLInputElement, index: number) => {
    inputsRef.current[index] = el;
  };

  return (
    <div className="flex justify-between w-[80%]">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement) => handleRef(el, index)}
          type="number"
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="m-0 py-[20px] text-center rounded bg-bgColor dark:bg-customGrey-black text-textColor dark:text-textColor-dark focus:ring-0 focus:border-primary text-[20px] w-[20%] max-w-[150px] min-w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      ))}
    </div>
  );
};

export default CustomOtpInput;
