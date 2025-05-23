import type { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  selected: boolean;
}

export default function ButtonLight({
  onClick,
  children,
  selected,
}: ButtonProps) {
  return (
    <button
      className={`text-gray-700 flex items-center gap-3 my-2 px-6 py-3 w-full rounded-md font-semibold cursor-pointer text-xl text-left hover:bg-gray-200 transition-all ${
        selected ? "bg-gray-200" : "bg-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
