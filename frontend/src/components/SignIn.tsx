import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onClickHandler() {
    if (username && password) {
      const response = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.msg);
      } else {
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } else {
      alert("Please enter all the fields first!");
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="absolute top-10 bg-gray-800 px-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-gray-200 text-center py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#0477b5"
            viewBox="0 0 256 256"
            className="inline mr-2"
          >
            <path d="M248,124a56.11,56.11,0,0,0-32-50.61V72a48,48,0,0,0-88-26.49A48,48,0,0,0,40,72v1.39a56,56,0,0,0,0,101.2V176a48,48,0,0,0,88,26.49A48,48,0,0,0,216,176v-1.41A56.09,56.09,0,0,0,248,124ZM88,208a32,32,0,0,1-31.81-28.56A55.87,55.87,0,0,0,64,180h8a8,8,0,0,0,0-16H64A40,40,0,0,1,50.67,86.27,8,8,0,0,0,56,78.73V72a32,32,0,0,1,64,0v68.26A47.8,47.8,0,0,0,88,128a8,8,0,0,0,0,16,32,32,0,0,1,0,64Zm104-44h-8a8,8,0,0,0,0,16h8a55.87,55.87,0,0,0,7.81-.56A32,32,0,1,1,168,144a8,8,0,0,0,0-16,47.8,47.8,0,0,0-32,12.26V72a32,32,0,0,1,64,0v6.73a8,8,0,0,0,5.33,7.54A40,40,0,0,1,192,164Zm16-52a8,8,0,0,1-8,8h-4a36,36,0,0,1-36-36V80a8,8,0,0,1,16,0v4a20,20,0,0,0,20,20h4A8,8,0,0,1,208,112ZM60,120H56a8,8,0,0,1,0-16h4A20,20,0,0,0,80,84V80a8,8,0,0,1,16,0v4A36,36,0,0,1,60,120Z"></path>
          </svg>
          Second Brain
        </h1>
      </div>
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClickHandler();
          }
        }}
        className="shadow-xl border-2 border-gray-300 px-10 w-[32rem] py-7 rounded-md bg-gray-100"
      >
        <div className="flex items-center mb-10">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            fill="#0477b5"
            viewBox="0 0 256 256"
          >
            <path d="M184,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h64A8,8,0,0,1,184,112Zm-8,24H112a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm48-88V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H72V48H48Zm160,0V48H88V208H208Z"></path>
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            fill="#0477b5"
            viewBox="0 0 256 256"
            className="rotate-40"
          >
            <path d="M212,136a12,12,0,1,1-12-12A12,12,0,0,1,212,136Zm36,0c0,40.37-21.08,72-48,72H56c-26.92,0-48-31.63-48-72S29.08,64,56,64H92.69l37.65-37.66A8,8,0,0,1,136,24h32a8,8,0,0,1,0,16H139.31l-24,24H200C226.92,64,248,95.63,248,136ZM56,192H169.51a73.46,73.46,0,0,1-12.67-24H80a8,8,0,0,1,0-16h73.16A110.63,110.63,0,0,1,152,136c0-22.86,6.76-42.9,17.51-56H56c-12.47,0-23.55,13.26-28.8,32H104a8,8,0,0,1,0,16H24.35q-.34,3.93-.35,8C24,166.36,38.65,192,56,192Zm176-56c0-30.36-14.65-56-32-56s-32,25.64-32,56,14.65,56,32,56S232,166.36,232,136Z"></path>
          </svg>
          <h1 className="text-5xl ml-4 font-black text-gray-700 ">Log In</h1>
        </div>
        <div className="flex-1">
          <Input
            inpType={"text"}
            val={username}
            setVal={setUsername}
            id="username"
            labelText="Username"
          />
          <Input
            inpType={"password"}
            val={password}
            setVal={setPassword}
            id="password"
            labelText="Password"
          />
          <div className="my-6">
            <Button onClick={onClickHandler}>Sign In</Button>
            <h3 className="mt-4 text-xl">
              Not a user?{" "}
              <Link to={"/signup"}>
                <span className="underline text-blue-600">Sign Up Now</span>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
