import type { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      className="bg-gray-600 text-gray-50 px-6 py-3 w-full rounded-xl font-semibold cursor-pointer text-3xl hover:bg-gray-900 transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
