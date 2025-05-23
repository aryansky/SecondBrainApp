interface InputProps {
  inpType: string;
  val: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  labelText?: string;
  placeholderText?: string;
}

export default function Input({
  inpType,
  val,
  setVal,
  id,
  labelText,
  placeholderText,
}: InputProps) {
  return (
    <div className="my-4">
      <label htmlFor={id} className="font-bold text-gray-700 m-1">
        {labelText}
      </label>
      <input
        id={id}
        type={inpType}
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
        placeholder={placeholderText}
        className="border-2 font-bold border-gray-400 p-3  w-full rounded-md outline-none focus:border-gray-700"
      />
    </div>
  );
}
