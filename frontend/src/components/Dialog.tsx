import type React from "react";

interface DialogTypes {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  borderColour: string;
}

export default function Dialog({
  open,
  onClose,
  children,
  borderColour,
}: DialogTypes) {
  return (
    <div
      onClick={onClose}
      className={`flex fixed inset-0 z-50 justify-center items-center transition-colors  ${
        open ? "visible opacity-100 bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white p-8 rounded-xl shadow transition-all border-10 ${borderColour} ${
          open ? "scale-100 opacity-100" : " scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="cursor-pointer p-1 absolute top-2 right-2 rounded-lg bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
