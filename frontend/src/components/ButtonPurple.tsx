import type { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function ButtonPurple({ onClick, children }: ButtonProps) {
  return (
    <button
      className="text-white bg-blue-700 flex items-center gap-3 px-6 py-3 w-full rounded-md font-semibold cursor-pointer inset-0 text-xl text-left border-2 border-blue-700 hover:text-black hover:bg-white transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
