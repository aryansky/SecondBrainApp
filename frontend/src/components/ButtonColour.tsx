import { useState, type ReactNode } from "react";

interface ButtonColourProps {
  onClick: () => void;
  children: ReactNode;
  style: string;
}

export default function ButtonColour({
  onClick,
  children,
  style,
}: ButtonColourProps) {
  const [mouseStyles, setMouseStyles] = useState("");

  return (
    <button
      onMouseDown={() => {
        setMouseStyles("scale-80");
      }}
      onMouseUp={() => {
        setMouseStyles("scale-100");
      }}
      onMouseLeave={() => setMouseStyles("scale-100")}
      className={`text-gray-50 px-6 py-3 w-full rounded-md cursor-pointer text-xl transition-all ${mouseStyles} ${style}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
