import { useState } from "react";

interface ContentCardTypes {
  link: string;
  type: string;
  title: string;
  tags?: string[];
  contentId?: string;
  getContent?: () => void;
  selected?: string;
  setContent?: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function ContentCard({
  link,
  type,
  title,
  tags,
  contentId,
  getContent = () => {},
  selected,
  setContent = () => {},
}: ContentCardTypes) {
  const [mouseStyles, setMouseStyles] = useState("");
  return (
    <div className="border-2 border-gray-300 rounded-md m-6 w-80 min-h-80 flex flex-col">
      <div className="relative bg-gray-100 p-4 rounded-t-md border-b-2 border-gray-300">
        <h1 className="font-bold text-2xl text-gray-800 w-10/12">{title}</h1>
        {contentId && (
          <button
            onMouseDown={() => {
              setMouseStyles("scale-80");
            }}
            onMouseUp={() => {
              setMouseStyles("scale-100");
            }}
            onClick={async () => {
              const response = await fetch(
                `http://localhost:3000/api/v1/content`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token") as string,
                  },
                  body: JSON.stringify({
                    contentId: contentId,
                  }),
                }
              );
              if (response.ok) {
                async function refreshContent() {
                  await getContent();
                  if (selected === "all") {
                    return;
                  }
                  setContent((contentArr) => {
                    return contentArr.filter((content) => {
                      return content["type"] === selected;
                    });
                  });
                }
                refreshContent();
              } else {
                console.log(response);
                alert("Deletion Failed");
              }
            }}
            className={`cursor-pointer w-fit p-1 ml-auto absolute top-3 right-3 rounded-lg transition-all hover:bg-gray-300 ${mouseStyles}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#e63535"
              viewBox="0 0 256 256"
            >
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex flex-col h-full px-4 pb-4">
        <h2 className="text-gray-800 mt-2 text-xl break-words">{link}</h2>
        <h2>{tags}</h2>
        <h2 className="font-black text-gray-400 text-lg mt-auto">#{type}</h2>
      </div>
    </div>
  );
}
